import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@elearning-fliki/trpc-server/routers";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8080/trpc",
    }),
  ],
});
