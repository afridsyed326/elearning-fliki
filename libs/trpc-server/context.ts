import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createTRPCContext = ({ req, res }: CreateExpressContextOptions) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : null;

    return {
        req,
        res,
        token,
    };
};

export type ITRPContext = Awaited<ReturnType<typeof createTRPCContext>>;
