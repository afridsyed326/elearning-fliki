import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

export default async function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = await getAuth();

    if (auth?.user?.role !== "teacher") {
        return redirect("/courses");
    }
    return <div>{children}</div>;
}
