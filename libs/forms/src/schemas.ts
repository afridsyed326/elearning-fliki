import { z } from "zod";

export const formSchemaRegister = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string().min(1, "Name is required"),
    role: z.enum(["student", "teacher"], {
        errorMap: () => ({
            message: "Role must be either 'student' or 'teacher'",
        }),
    }),
});

export const formSchemaUser = z.object({
    email: z.string(),
});

export const formSchemaSignIn = formSchemaRegister.pick({
    email: true,
    password: true,
});

export const zodSchemaRegisterWithProvider = z.object({
    email: z.string().email(),
    name: z.string(),
});

export const zodSchemaDefineRole = z.object({
    role: z.enum(["student", "teacher"], {
        errorMap: () => ({
            message: "Role must be either 'student' or 'teacher'",
        }),
    }),
});
