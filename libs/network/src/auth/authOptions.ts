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
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials || {};
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const data = await trpc.auth.signIn.mutate({ email, password });
                if (!data) {
                    throw new Error("Invalid credentials");
                }
                const user = data.user;
                if (!user._id) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: user._id.toString(),
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
            const { sub, picture, role, id, ...tokenProps } = token;
            const nowInSeconds = Math.floor(Date.now() / 1000);
            const expirationTimeStamp = nowInSeconds + MAX_AGE;
            return sign(
                {
                    sub: id, // ✅ Ensure sub is populated from id
                    id: id,
                    image: picture,
                    role,
                    ...tokenProps,
                    exp: expirationTimeStamp,
                },
                secret,
                {
                    algorithm: "HS256",
                }
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

                // @ts-ignore
                let dbUser: any = await trpc.auth.user.query({
                    email: email!,
                });

                // 2. If not, register a new one
                if (!dbUser) {
                    const res = await trpc.auth.registerWithProvider.mutate({
                        email: email || "",
                        name: name || "",
                    });
                    dbUser = res.user;
                }

                user.id = dbUser._id.toString();
                user.role = dbUser.role;
            }

            return true;
        },
        async jwt({ token, user }) {
            // When user first logs in
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = (user as any).role; // <-- store role
            }
            return token;
        },

        async session({ session, token }) {
            if (!token) {
                throw new Error("Token is required for session callback");
            }
            const dbUser = await trpc.auth.user.query({
                email: token?.email || "",
            });
            session.user = {
                // @ts-ignore
                id: token.id,
                email: token.email,
                // @ts-ignore
                name: dbUser?.name || token.email,
                // @ts-ignore
                role: dbUser?.role || token.role,
            };
            return session;
        },
    },
};

export const getAuth = () => getServerSession(authOptions);
