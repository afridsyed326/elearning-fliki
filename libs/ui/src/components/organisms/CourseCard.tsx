import { TCourse } from "../../lib/types";

type CourseCardProps = {
    course: TCourse;
};

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="space-y-3 rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md">
            <img src={course.thumbnailUrl} alt={course.title} className="w-100 h-64 object-cover" />
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

            <div className="pt-2">
                <a
                    href={`/courses/${course._id}`}
                    className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                    View Course →
                </a>
            </div>
        </div>
    );
}
