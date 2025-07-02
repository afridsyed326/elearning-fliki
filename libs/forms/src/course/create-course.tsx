"use client";

import { useForm } from "react-hook-form";
import {
    aiGenerateInput,
    createCourseSchema,
    CreateCourseValues,
    GenearteAICourseValues,
    EditCourseValues,
    editCourseSchema,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// export const userCreateCourseForm = () =>
//     useForm<CreateCourseValues>({
//         resolver: zodResolver(createCourseSchema),
//         defaultValues: {
//             title: "",
//             description: "",
//             teacher: "",
//             isPublished: false,
//             lessons: [
//                 {
//                     title: "",
//                     content: "",
//                     videoUrl: "",
//                     order: 0,
//                 },
//             ],
//         },
//     });

export const userCreateCourseForm = () =>
    useForm<CreateCourseValues>({
        resolver: zodResolver(createCourseSchema),
    });

export const userEditCourseForm = () =>
    useForm<EditCourseValues>({
        resolver: zodResolver(editCourseSchema),
    });

export const useGenerateAICourseForm = () =>
    useForm<GenearteAICourseValues>({
        resolver: zodResolver(aiGenerateInput),
    });
