import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider as TRPCProvider } from "@elearning-fliki/trpc-client/src/Provider";
import { SessionProvider } from "@elearning-fliki/ui/src/components/molecules/SessionProvider";
import { Toaster } from "@elearning-fliki/ui/src/components/atoms/sonner";
import "@elearning-fliki/ui/src/index.css";
import NavbarWrapper from "../_components/NavbarWrapper";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "eLearning - Fliki",
    description: "eLearnig Platform that is powered by AI",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = await getAuth();
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased role-${auth?.user?.role}`}
            >
                <SessionProvider>
                    <TRPCProvider>
                        <NavbarWrapper />
                        <div className="bg-[url('/bg.jpg')] bg-cover bg-no-repeat pt-16">
                            {children}
                        </div>
                    </TRPCProvider>
                    <Toaster position="top-center" className="!bg-white" />
                </SessionProvider>
            </body>
        </html>
    );
}
