import mongoose, { Document } from "mongoose";
export interface ILesson {
  title: string;
  content: string;
  videoUrl?: string;
  order: number;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  teacher: mongoose.Types.ObjectId;
  lessons: ILesson[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "student" | "teacher";
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  progress: number;
  completedLessons: number[];
  enrolledAt: Date;
}
