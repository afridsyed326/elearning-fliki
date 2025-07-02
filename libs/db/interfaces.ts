import mongoose, { Document } from "mongoose";
import { Types } from "mongoose";
export interface ILesson {
    title: string;
    content: string;
    videoUrl?: string;
    order: number;
}

export interface ICourse extends Document {
    title: string;
    thumbnailUrl: string;
    description: string;
    teacher: mongoose.Types.ObjectId;
    lessons: ILesson[];
    isPublished: boolean | string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPartialCourse {
    _id?: string;
    title?: string;
    thumbnailUrl?: string;
    description?: string;
    teacher?: mongoose.Types.ObjectId;
    lessons?: {
        title?: string;
        content?: string;
        videoUrl?: string;
        order?: number;
    }[];
    isPublished?: boolean | string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser {
    _id?: Types.ObjectId;
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
