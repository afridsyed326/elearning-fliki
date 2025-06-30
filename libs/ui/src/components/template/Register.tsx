"use client";

import { userFormRegister, FormRegister } from "@elearning-fliki/forms/src/register";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { signIn } from "next-auth/react";
import { AuthLayout } from "../organisms/AuthLayout";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { RadioGroup, RadioGroupItem } from "../atoms/radio-group";
import { toast } from "sonner";
import { TRPCClientError } from "@elearning-fliki/trpc-client/src/error";
import { Controller } from "react-hook-form";

export default function Register() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = userFormRegister();
    const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation();

    const roleOptions = [
        { value: "student", label: "Student" },
        { value: "teacher", label: "Teacher" },
    ];

    const onSubmit = async (data: FormRegister) => {
        try {
            const user = await mutateAsync(data);
            toast("Account created successfully!");
            if (user) {
                const res = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });
                if (res?.ok) {
                    window.location.href = "/";
                } else {
                    toast.error("Login failed, " + res?.error);
                    // Optional: Show toast or set error message state
                }
            }
        } catch (error: unknown) {
            if (error instanceof TRPCClientError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    };

    return (
        <AuthLayout title="Register">
            <div className="mx-auto flex w-[400px] flex-col justify-center p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-2 flex flex-col gap-2">
                    <Label title="Email" error={errors?.email?.message}>
                        <Input {...register("email")} placeholder="Email" />
                    </Label>
                    <Label title="Name" error={errors?.name?.message}>
                        <Input {...register("name")} placeholder="Name" />
                    </Label>

                    <Label title="Password" error={errors?.password?.message}>
                        <Input {...register("password")} type="password" placeholder="Password" />
                    </Label>
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
                    <Button type="submit" className=" " variant={"default"}>
                        Register
                    </Button>
                </form>
                <span className="text-muted-foreground mb-2 text-center text-sm">or</span>
                <Button
                    type="button"
                    variant={"outline"}
                    className="gap-3"
                    onClick={() =>
                        signIn("google", {
                            callbackUrl: "/",
                        })
                    }
                >
                    <img src="google.svg" className="w-6" alt="Google Login" />
                    Sign Up with Google
                </Button>
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Already have an account?</span>
                    <a href="/signin">
                        <Button variant={"link"} className="text-sm" loading={isLoading}>
                            Sign In
                        </Button>
                    </a>
                </div>
            </div>
        </AuthLayout>
    );
}
