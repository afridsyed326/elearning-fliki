import { TRPCError } from "@trpc/server";
import { connectToDatabase } from "@elearning-fliki/db/mongoose";
import { Role } from "./types";
import { UserModel } from "@elearning-fliki/db/models/UserModel";

export const userHasRequiredRole = async (
  userId: string,
  requiredRole: Role,
): Promise<boolean> => {
  await connectToDatabase(); // Ensure MongoDB is connected

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  if (user.role !== requiredRole) {
    return false; // User has the required role
  }

  return true;
};

export const authorizeUser = async (userId: string, roles: Role[]) => {
  if (!roles || roles.length === 0) {
    return true; // No roles specified, allow access
  }

  const roleCheckPromises = roles.map((role) =>
    userHasRequiredRole(userId, role),
  );

  const roleCheckResults = await Promise.all(roleCheckPromises);

  if (!roleCheckResults.some(Boolean)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not have the required role(s)",
    });
  }
};
