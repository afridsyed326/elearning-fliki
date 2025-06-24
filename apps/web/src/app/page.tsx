"use client";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";

export default function Home() {
  const { data } = trpcClient.auth.users.useQuery();
  return <main>Hello {JSON.stringify(data)}</main>;
}
