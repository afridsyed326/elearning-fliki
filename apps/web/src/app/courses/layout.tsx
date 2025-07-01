import AuthedWrapper from "@/_components/AuthedWrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AuthedWrapper>{children}</AuthedWrapper>
        </div>
    );
}
