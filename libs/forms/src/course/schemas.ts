import { z } from "zod";

// Lesson schema
export const lessonSchema = z.object({
    title: z.string().min(1, "Lesson title is required"),
    content: z.string().min(1, "Lesson content is required"),
    videoUrl: z.string().url("Invalid video URL").optional(),
    order: z.number().int().nonnegative("Order must be a non-negative integer"),
});

export const createCourseSchema = z.object({
    title: z.string(),
    thumbnailUrl: z.string(),
    description: z.string(),
    lessons: z.array(
        z.object({
            title: z.string(),
            content: z.string(),
            order: z.number(),
            videoUrl: z.string().optional(),
        })
    ),
    isPublished: z.string(),
});

export type CreateCourseValues = z.infer<typeof createCourseSchema>;

// If teacher is a full User object when populated
export const teacherSchema = z.object({
    _id: z.string(),
    name: z.string(), // Add other fields as per your model
    email: z.string().email(),
});

export const courseSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    teacher: teacherSchema,
    lessons: z.array(lessonSchema),
    isPublished: z.boolean(),
    createdAt: z.string(), // Dates will be serialized as strings
    updatedAt: z.string(),
});

export const coursesSchema = z.array(courseSchema);

export const courseSlugInput = z.object({ slug: z.string() });
export const courseEnrollInput = z.object({ course: z.string() });
export const aiGenerateInput = z.object({ prompt: z.string() });
export type GenearteAICourseValues = z.infer<typeof aiGenerateInput>;
