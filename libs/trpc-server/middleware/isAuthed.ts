import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import { JwtPayload, verify } from "jsonwebtoken";
import { Role } from "../types";
import { authorizeUser } from "../util";

export const isAuthed = (...roles: Role[]) =>
    t.middleware(async (opts) => {
        const { token } = opts.ctx;

        if (!token) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Token not found",
            });
        }
        let userId;

        try {
            const user = await verify(token, process.env.NEXTAUTH_SECRET || "");
            userId = (user as JwtPayload).id;
        } catch (error) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Invalid token",
            });
        }

        await authorizeUser(userId, roles);

        return opts.next({ ...opts, ctx: { ...opts.ctx, userId } });
    });
