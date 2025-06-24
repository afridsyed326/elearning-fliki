// apps/server/src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUser>("user", userSchema);
