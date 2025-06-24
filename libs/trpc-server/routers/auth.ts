import { UserModel } from "@elearning-fliki/db/models/UserModel";
import { publicProcedure, router } from "../trpc";
import { withMongoConnection } from "../middleware/dbConnection";

export const authRoutes = router({
  users: publicProcedure.use(withMongoConnection).query(() => UserModel.find()),
});
