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
} from "@elearning-fliki/forms/src/course/schemas";

export const courseRoutes = router({
    courses: publicProcedure
        .use(withMongoConnection)
        // .output(coursesSchema)
        .query(async () => {
            return await CourseModel.find().populate("teacher").exec();
            //   return courses.map(course => course.toObject());
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
});
