"use client";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data } = trpcClient.auth.users.useQuery();
  const { data: session } = useSession();

  return (
    <main>
      Hello
      {JSON.stringify(data)}
      <div>
        {session?.user ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </main>
  );
}
