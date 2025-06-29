"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodSchemaDefineRole } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export type DefineRoleForm = z.infer<typeof zodSchemaDefineRole>;

export const userFormDefineRole = () =>
    useForm<DefineRoleForm>({
        resolver: zodResolver(zodSchemaDefineRole),
    });
