import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider as TRPCProvider } from "@elearning-fliki/trpc-client/src/Provider";
import { SessionProvider } from "@elearning-fliki/ui/src/components/molecules/SessionProvider";
import { Toaster } from "@elearning-fliki/ui/src/components/atoms/sonner";
import "@elearning-fliki/ui/src/index.css";
import NavbarWrapper from "../_components/NavbarWrapper";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionProvider>
                    <TRPCProvider>
                        <NavbarWrapper />
                        <div className="">{children}</div>
                    </TRPCProvider>
                    <Toaster position="top-center" className="!bg-white" />
                </SessionProvider>
            </body>
        </html>
    );
}
