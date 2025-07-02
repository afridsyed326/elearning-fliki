import { notFound } from "next/navigation";
import { trpc } from "@elearning-fliki/trpc-client/src";
import { TCourse } from "@elearning-fliki/ui/src/lib/types";
import EditCourseForm from "@elearning-fliki/ui/src/components/template/EditCourseForm";

export default async function CourseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = (await trpc.course.course.query({ slug })) as TCourse;
    if (!course) return notFound();

    return (
        <div className="mx-auto max-w-4xl p-6">
            <EditCourseForm initialData={course} />
        </div>
    );
}
