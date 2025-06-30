// apps/server/src/models/Enrollment.ts
import mongoose, { Document, Schema } from "mongoose";
import { IEnrollment } from "../interfaces";

const enrollmentSchema = new Schema<IEnrollment>({
    student: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "course",
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    completedLessons: [
        {
            type: Number,
        },
    ],
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
});

export const Enrollment = mongoose.model<IEnrollment>("enrollment", enrollmentSchema);
