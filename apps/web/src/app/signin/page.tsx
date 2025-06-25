"use client";

import { userFormSignIn } from "@elearning-fliki/forms/src/signin";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const { register, handleSubmit } = userFormSignIn();

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
          });
        })}
        className="grid grid-cols-2 bg-slate-600"
      >
        <input {...register("email")} placeholder="email" />
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <button type="submit">Sign In</button>
      </form>
      <button type="button" onClick={() => signIn("google")}>
        Google
      </button>
    </div>
  );
}
