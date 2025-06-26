"use client";

import {
  userFormSignIn,
  FormTypeSignin,
} from "@elearning-fliki/forms/src/signin";
import { signIn } from "next-auth/react";
import { AuthLayout } from "../organisms/AuthLayout";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { toast } from "sonner";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = userFormSignIn();

  const onSubmit = async (data: FormTypeSignin) => {
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
  };

  return (
    <AuthLayout title="Sign In">
      <div className="p-5 flex flex-col justify-center mx-auto w-[400px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mb-2"
        >
          <Label title="Email" error={errors?.email?.message}>
            <Input {...register("email")} placeholder="email" />
          </Label>
          <Label title="Password" error={errors?.password?.message}>
            <Input
              {...register("password")}
              type="password"
              placeholder="password"
            />
          </Label>
          <Button type="submit" className="" variant={"default"}>
            Sign In
          </Button>
        </form>

        <span className="text-sm text-muted-foreground text-center mb-2">
          or
        </span>

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
          Sign in with Google
        </Button>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Don't have an account?
          </span>
          <a href="/register">
            <Button variant={"link"} className="text-sm" loading={isLoading}>
              Sign Up
            </Button>
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}
