"use client";

import { AuthLayout } from "../organisms/AuthLayout";
import { Label } from "../atoms/label";
import { Button } from "../atoms/button";
import { userFormDefineRole, DefineRoleForm } from "@elearning-fliki/forms/src/define-role";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { RadioGroup, RadioGroupItem } from "../atoms/radio-group";
import { signOut } from "next-auth/react";
import { Controller } from "react-hook-form";

const DefineRole = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isLoading },
    } = userFormDefineRole();

    const { mutateAsync } = trpcClient.auth.defineRole.useMutation();

    const onSubmit = async (data: DefineRoleForm) => {
        const res = await mutateAsync(data);
        if (res) {
            window.location.reload();
        }
    };

    const roleOptions = [
        { value: "student", label: "Student" },
        { value: "teacher", label: "Teacher" },
    ];

    return (
        <AuthLayout title="Define Role">
            <div className="mx-auto flex w-[400px] flex-col justify-center p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-2 flex flex-col gap-2">
                    <h2 className="text-center text-3xl">I am a</h2>
                    <Controller
                        control={control}
                        name="role"
                        defaultValue="student"
                        render={({ field }) => (
                            <RadioGroup
                                className="flex items-center justify-center gap-2 bg-white p-2"
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <Label title="Role" error={errors?.role?.message}>
                                    I am a
                                </Label>
                                <div className="flex items-center gap-4">
                                    {roleOptions.map((opt) => (
                                        <div
                                            key={opt.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem value={opt.value} id={opt.value} />
                                            <Label
                                                htmlFor={opt.value}
                                                className="cursor-pointer text-sm"
                                            >
                                                {opt.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        )}
                    />
                    <Button type="submit" className="" variant={"default"} loading={isLoading}>
                        Submit
                    </Button>
                </form>
                <Button
                    onClick={() =>
                        signOut({
                            callbackUrl: "/",
                        })
                    }
                    className=""
                    variant={"link"}
                >
                    Logout
                </Button>
            </div>
        </AuthLayout>
    );
};

export default DefineRole;
