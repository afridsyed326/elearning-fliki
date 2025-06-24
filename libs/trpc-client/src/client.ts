import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@elearning-fliki/trpc-server/routers";

export const trpcClient = createTRPCReact<AppRouter>();
