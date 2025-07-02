import { CourseModel } from "@elearning-fliki/db/models/CourseModel";
import { withMongoConnection } from "../middleware/dbConnection";
import { privateTeacherProcedure, publicProcedure, privateSudentProcedure, router } from "../trpc";
import {
    createCourse,
    enrollStudent,
    getCourseProgress,
    updateCourse,
    enrolledCourses,
} from "@elearning-fliki/db/course.services";
import {
    courseSlugInput,
    courseEnrollInput,
    createCourseSchema,
    aiGenerateInput,
    editCourseSchema,
} from "@elearning-fliki/forms/src/course/schemas";
import { generateCourseFromPrompt } from "@elearning-fliki/ai/generateCourse";
import { paginationSchema } from "@elearning-fliki/forms/src/schemas";

export const courseRoutes = router({
    courses: publicProcedure.use(withMongoConnection).query(async () => {
        return await CourseModel.find().populate("teacher").exec();
    }),
    coursesByTeacher: privateTeacherProcedure.use(withMongoConnection).query(async ({ ctx }) => {
        return await CourseModel.find({ teacher: ctx.userId }).populate("teacher").exec();
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
    update: privateTeacherProcedure
        .use(withMongoConnection)
        .input(editCourseSchema)
        .mutation(async ({ input }) => {
            return await updateCourse(input._id, input);
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
    enrolled: privateSudentProcedure.use(withMongoConnection).query(async ({ ctx }) => {
        return await enrolledCourses(ctx.userId);
    }),
    generate: privateTeacherProcedure.input(aiGenerateInput).mutation(async ({ input }) => {
        const generatedCourse = await generateCourseFromPrompt(input.prompt, {
            name: "",
            email: "",
        });
        return generatedCourse;
    }),
    getPaginatedCourses: publicProcedure.input(paginationSchema).query(async ({ input }) => {
        const { page, limit, search } = input;
        const skip = (page - 1) * limit;

        const searchQuery = search
            ? {
                  $or: [
                      { title: { $regex: search, $options: "i" } },
                      { description: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        const [courses, total] = await Promise.all([
            CourseModel.find({ ...searchQuery, isPublished: true })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            CourseModel.countDocuments(searchQuery),
        ]);

        return {
            courses,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }),
});
