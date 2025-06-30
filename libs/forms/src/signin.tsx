"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaSignIn } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormTypeSignin = z.infer<typeof formSchemaSignIn>;

export const userFormSignIn = () =>
    useForm<FormTypeSignin>({
        resolver: zodResolver(formSchemaSignIn),
    });
