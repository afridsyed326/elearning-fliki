import AuthedWrapper from "@/_components/AuthedWrapper";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = await getAuth();

    if (auth?.user.role !== "student") {
        return redirect("/teacher/courses");
    }
    return (
        <div className="pt-16">
            <AuthedWrapper>{children}</AuthedWrapper>
        </div>
    );
}
