import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { trpc } from "@elearning-fliki/trpc-client/src";
import { JWT } from "next-auth/jwt";
import { sign, verify } from "jsonwebtoken";

const MAX_AGE = 1 * 24 * 60 * 60;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const data = await trpc.auth.signIn.mutate({ email, password });
        if (!data) {
          throw new Error("Invalid credentials");
        }
        const user: any = data.user;
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          token: data.token,
        };
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE,
  },
  jwt: {
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error("Token is required for encoding");
      }
      const { sub, picture, ...tokenProps } = token;
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expirationTimeStamp = nowInSeconds + MAX_AGE;
      return sign(
        {
          id: sub,
          image: picture,
          ...tokenProps,
          exp: expirationTimeStamp,
        },
        secret,
        {
          algorithm: "HS256",
        },
      );
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error("Token is required for encoding");
      }

      try {
        const decoded = verify(token, secret, {
          algorithms: ["HS256"],
        });
        return decoded as JWT;
      } catch (error) {
        return null;
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { name, email } = user;
        const existingUser = await trpc.auth.user.query({
          email: email!,
        });

        if (!existingUser) {
          await trpc.auth.registerWithProvider.mutate({
            email: email || "",
            name: name || "",
          });
        }
      }
      return true;
    },

    async session({ session, token }) {
      if (!token) {
        throw new Error("Token is required for session callback");
      }
      session.user = {
        // @ts-ignore
        id: token.sub,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      return session;
    },
  },
};

export const getAuth = () => getServerSession(authOptions);
