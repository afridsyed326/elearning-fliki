import { TCourse } from "../../lib/types";
import CourseImage from "../atoms/course-image";

type CourseCardProps = {
    course: TCourse;
    teacherAccess?: boolean;
};

export default function CourseCard({ course, teacherAccess }: CourseCardProps) {
    return (
        <div className="space-y-3 rounded-xl border-2 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex justify-center">
                <CourseImage
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-100 h-64 object-center"
                />
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{course.description}</p>
                </div>
            </div>

            <div className="text-sm text-gray-500">
                <p>👨‍🏫 {course.teacher.name}</p>
                <p>📅 Created: {new Date(course.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="mt-2 text-sm text-gray-700">
                <p>📝 Lessons: {course.lessons.length}</p>
            </div>

            <div className="flex justify-between pt-2">
                <a
                    href={
                        teacherAccess ? `/teacher/courses/${course._id}` : `/courses/${course._id}`
                    }
                    className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                    View Course →
                </a>
                {teacherAccess && (
                    <div
                        className={`rounded-full border px-2 py-1 text-xs font-semibold ${course.isPublished ? "border-green-600 bg-green-100 text-green-800" : "border-red-600 bg-red-100 text-red-600"}`}
                    >
                        {course.isPublished ? "Published" : "Not published"}
                    </div>
                )}
            </div>
        </div>
    );
}
