"use client";

import { useForm } from "react-hook-form";
import { createCourseSchema, CreateCourseValues } from "./schemas";
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
