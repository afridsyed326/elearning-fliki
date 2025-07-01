import { inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { authRoutes } from "./auth";
import { courseRoutes } from "./course";

export const appRouter = router({
    auth: authRoutes,
    course: courseRoutes,
});

export type AppRouter = typeof appRouter;
export type AppRouterType = inferRouterOutputs<AppRouter>;
export type Course = AppRouterType["course"]["course"];
export type Enrollment = AppRouterType["course"]["isEnrolled"];
