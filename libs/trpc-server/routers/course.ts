import { CourseModel } from "@elearning-fliki/db/models/CourseModel";
import { withMongoConnection } from "../middleware/dbConnection";
import { privateTeacherProcedure, publicProcedure, privateSudentProcedure, router } from "../trpc";
import {
    createCourse,
    enrollStudent,
    getCourseProgress,
} from "@elearning-fliki/db/course.services";
import {
    courseSlugInput,
    courseEnrollInput,
    createCourseSchema,
    aiGenerateInput,
} from "@elearning-fliki/forms/src/course/schemas";
import { generateCourseFromPrompt } from "@elearning-fliki/ai/generateCourse";

export const courseRoutes = router({
    courses: publicProcedure.use(withMongoConnection).query(async () => {
        return await CourseModel.find().populate("teacher").exec();
    }),
    topCourses: publicProcedure.use(withMongoConnection).query(async () => {
        return await CourseModel.find().populate("teacher").limit(3).exec();
    }),
    course: publicProcedure
        .use(withMongoConnection)
        .input(courseSlugInput)
        .query(async ({ input }) => {
            return await CourseModel.findById(input.slug).populate("teacher").exec();
        }),
    add: privateTeacherProcedure
        .use(withMongoConnection)
        .input(createCourseSchema)
        .mutation(async ({ ctx, input }) => {
            return await createCourse(input, ctx.userId);
        }),
    enroll: privateSudentProcedure
        .use(withMongoConnection)
        .input(courseEnrollInput)
        .mutation(async ({ ctx, input }) => {
            return await enrollStudent(ctx.userId, input.course);
        }),
    isEnrolled: privateSudentProcedure
        .use(withMongoConnection)
        .input(courseEnrollInput)
        .query(async ({ ctx, input }) => {
            return await getCourseProgress(ctx.userId, input.course);
        }),
    generate: privateTeacherProcedure.input(aiGenerateInput).mutation(async ({ input }) => {
        const generatedCourse = await generateCourseFromPrompt(input.prompt, {
            name: "",
            email: "",
        });
        return generatedCourse;
    }),
});
