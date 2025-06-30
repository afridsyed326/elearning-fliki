"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaRegister } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormRegister = z.infer<typeof formSchemaRegister>;

export const userFormRegister = () =>
    useForm<FormRegister>({
        resolver: zodResolver(formSchemaRegister),
    });
