import { notFound, redirect } from "next/navigation";
import { trpc } from "@elearning-fliki/trpc-client/src";
import { TCourse } from "@elearning-fliki/ui/src/lib/types";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import CourseCard from "@elearning-fliki/ui/src/components/organisms/CourseCard";

const EnrolledPage = async () => {
    const auth = await getAuth();

    if (auth?.user.role === "teacher") {
        return redirect("/teacher/courses");
    }

    const courses = (await trpc.course.enrolled.query()) as TCourse[];
    if (!courses) return notFound();

    return (
        <div className="mx-auto w-full">
            <div className="mt-2 justify-between rounded-lg px-4 py-5 sm:flex">
                <h2 className="text-2xl font-bold"> My Enrolled Courses</h2>
            </div>

            <div className="mx-auto grid w-full max-w-6xl gap-3 p-6 sm:grid-cols-3">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default EnrolledPage;
