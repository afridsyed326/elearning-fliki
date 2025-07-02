import { notFound, redirect } from "next/navigation";
import { trpc } from "@elearning-fliki/trpc-client/src";
import { TCourse } from "@elearning-fliki/ui/src/lib/types";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import CourseCard from "@elearning-fliki/ui/src/components/organisms/CourseCard";
import { Button } from "@elearning-fliki/ui/src/components/atoms/button";
import Link from "next/link";

export default async function CourseTeacherPage() {
    const auth = await getAuth();

    if (auth?.user.role === "student") {
        return redirect("/courses");
    }

    const courses = (await trpc.course.coursesByTeacher.query()) as TCourse[];
    if (!courses) return notFound();

    return (
        <div className="mx-auto w-full">
            <div className="mt-2 justify-between rounded-lg px-4 py-5 sm:flex">
                <h2 className="text-2xl font-bold"> Courses by me</h2>
                <Link href="/teacher/courses/add">
                    <Button>Create New Course</Button>
                </Link>
            </div>

            <div className="mx-auto grid w-full max-w-6xl gap-3 p-6 sm:grid-cols-3">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} teacherAccess />
                ))}
            </div>
        </div>
    );
}
