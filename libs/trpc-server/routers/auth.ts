import { UserModel } from "@elearning-fliki/db/models/UserModel";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { withMongoConnection } from "../middleware/dbConnection";
import {
    formSchemaRegister,
    formSchemaSignIn,
    formSchemaUser,
    zodSchemaDefineRole,
    zodSchemaRegisterWithProvider,
} from "@elearning-fliki/forms/src/schemas";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser } from "@elearning-fliki/db/interfaces";

export const authRoutes = router({
    users: publicProcedure.use(withMongoConnection).query(() => UserModel.find()),
    user: publicProcedure
        .use(withMongoConnection)
        .input(formSchemaUser)
        .query(({ input }) => UserModel.findOne({ email: input.email })),
    registerWithCredentials: publicProcedure
        .use(withMongoConnection)
        .input(formSchemaRegister)
        .mutation(async ({ input }) => {
            const { email, password, name, role } = input;

            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User with this email already exists",
                });
            }

            const salt = bcrypt.genSaltSync();
            const passwordHash = bcrypt.hashSync(password, salt);
            const user = await UserModel.create({
                email,
                password: passwordHash,
                name,
                role,
            });

            const token = sign(
                {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                },
                process.env.NEXTAUTH_SECRET || ""
            );

            return {
                user,
                token,
            };
        }),

    signIn: publicProcedure
        .use(withMongoConnection)
        .input(formSchemaSignIn)
        .mutation(async ({ input }): Promise<{ token: string; user: IUser }> => {
            const user = await UserModel.findOne({ email: input.email });
            if (!user) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid email or password",
                });
            }
            const isPasswordValid = bcrypt.compare(input.password, user.password);
            if (!isPasswordValid) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid email or password",
                });
            }
            const userId = user._id.toString();
            const userData = {
                id: userId,
                email: user.email,
                role: user.role,
            };

            const token = sign(userData, process.env.NEXTAUTH_SECRET || "");

            return {
                user,
                token,
            };
        }),
    registerWithProvider: publicProcedure
        .use(withMongoConnection)
        .input(zodSchemaRegisterWithProvider)
        .mutation(async ({ input }) => {
            const { name, email } = input;
            const user = await UserModel.create({
                name,
                email,
                role: "student",
            });
            const userData = {
                id: user._id.toString(),
                email: user.email,
                role: user.role,
            };
            const token = sign(userData, process.env.NEXTAUTH_SECRET || "");
            return {
                user,
                token,
            };
        }),
    defineRole: privateProcedure
        .use(withMongoConnection)
        .input(zodSchemaDefineRole)
        .mutation(async ({ ctx, input }) => {
            const { role } = input;
            const user = await UserModel.findById(ctx.userId);
            if (!user) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid user id",
                });
            }

            user.role = role;
            await user.save();
            return user;
        }),
});
