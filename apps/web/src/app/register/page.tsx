"use client";

import { userFormRegister } from "@elearning-fliki/forms/src/register";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";

export default function RegisterPage() {
  const { register, handleSubmit } = userFormRegister();
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const user = await mutateAsync(data);
        console.log("User registered:", user);
      })}
      className="grid grid-cols-2 bg-slate-600"
    >
      <input {...register("email")} placeholder="email" />
      <input {...register("name")} placeholder="name" />
      <input {...register("password")} type="password" placeholder="password" />
      <input {...register("role")} placeholder="role" />
      <button type="submit">Register</button>
    </form>
  );
}
