import mongoose, { Schema } from "mongoose";
import { ICourse, ILesson } from "../interfaces";

const lessonSchema = new Schema<ILesson>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String },
    order: { type: Number, required: true },
});

const courseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        lessons: [lessonSchema],
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const CourseModel = mongoose.model<ICourse>("course", courseSchema);
