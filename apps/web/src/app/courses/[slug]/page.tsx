import { notFound } from "next/navigation";
import { trpc } from "@elearning-fliki/trpc-client/src";
import FullCourseViewer from "@elearning-fliki/ui/src/components/template/FullCourseViewer";
import { TCourse, TStudentEnrollment } from "@elearning-fliki/ui/src/lib/types";

export default async function CourseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = (await trpc.course.course.query({ slug })) as TCourse;
    if (!course) return notFound();
    const studentEnrollment = (await trpc.course.isEnrolled.query({
        course: slug,
    })) as TStudentEnrollment;

    return (
        <div className="mx-auto max-w-4xl p-6">
            <FullCourseViewer course={course} studentEnrollment={studentEnrollment} />
        </div>
    );
}
