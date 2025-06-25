import { UserModel } from "@elearning-fliki/db/models/UserModel";
import { publicProcedure, router } from "../trpc";
import { withMongoConnection } from "../middleware/dbConnection";
import { formSchemaRegister } from "@elearning-fliki/forms/src/schemas";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export const authRoutes = router({
  users: publicProcedure.use(withMongoConnection).query(() => UserModel.find()),
  registerWithCredentials: publicProcedure
    .input(formSchemaRegister)
    .mutation(async ({ ctx, input }) => {
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
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.NEXTAUTH_SECRET || "",
      );

      return {
        user,
        token,
      };
    }),
});
