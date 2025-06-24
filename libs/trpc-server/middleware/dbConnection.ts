// libs/trpc/middleware/dbConnection.ts
import { connectToDatabase } from "@elearning-fliki/db/mongoose";
import { middleware } from "../trpc"; // adjust path as needed

export const withMongoConnection = middleware(async (opts) => {
  await connectToDatabase(); // 🔌 ensure MongoDB is connected
  return opts.next(); // 🟢 continue with next step
});
