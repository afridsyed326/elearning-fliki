"use client";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import { TCourse, TLesson, TStudentEnrollment } from "../../lib/types";

type FullCourseViewerProps = {
    course: TCourse;
    studentEnrollment: TStudentEnrollment | null;
};

export default function FullCourseViewer({ course, studentEnrollment }: FullCourseViewerProps) {
    console.log({ studentEnrollment });
    const [activeLesson, setActiveLesson] = useState<TLesson | null>(
        course.lessons.length > 0 ? course.lessons[0] : null
    );

    const { mutateAsync } = trpcClient.course.enroll.useMutation();

    return (
        <div className="mx-auto max-w-6xl space-y-6 rounded-lg bg-white/90 p-6">
            <header>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="mt-1 text-gray-600">{course.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                    <p>👨‍🏫 {course.teacher.name}</p>
                    <p>📧 {course.teacher.email}</p>
                    <p>📅 Created on: {new Date(course.createdAt).toDateString()}</p>
                </div>
            </header>

            {!studentEnrollment ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-yellow-50 p-6 text-center">
                    <p className="text-lg font-medium text-gray-700">
                        You are not enrolled in this course.
                    </p>
                    <button
                        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                        onClick={async () => {
                            await mutateAsync({ course: course._id });
                            toast("Enrolled successfully!");
                            window.location.reload();
                        }}
                    >
                        Enroll to Start Learning
                    </button>
                </div>
            ) : (
                <>
                    {/* Video Player */}
                    {activeLesson?.videoUrl && (
                        <div className="aspect-video w-full overflow-hidden rounded">
                            <ReactPlayer
                                src={activeLesson.videoUrl}
                                width="100%"
                                height="100%"
                                controls
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1 },
                                    },
                                }}
                            />
                        </div>
                    )}

                    {/* Lesson Navigation */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <aside className="space-y-2 md:col-span-1">
                            <h2 className="text-lg font-semibold">Lessons</h2>
                            <ul className="space-y-1">
                                {course.lessons.map((lesson, index) => (
                                    <li key={index}>
                                        <button
                                            className={`w-full rounded border p-2 text-left ${
                                                activeLesson?.order === lesson.order
                                                    ? "border-blue-400 bg-blue-100 text-blue-800"
                                                    : "hover:bg-gray-100"
                                            }`}
                                            onClick={() => setActiveLesson(lesson)}
                                        >
                                            {index + 1}. {lesson.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Lesson Content */}
                        <main className="space-y-4 md:col-span-3">
                            {activeLesson && (
                                <>
                                    <h2 className="text-2xl font-semibold">{activeLesson.title}</h2>
                                    <p className="whitespace-pre-line text-gray-700">
                                        {activeLesson.content}
                                    </p>
                                </>
                            )}
                        </main>
                    </div>
                </>
            )}
        </div>
    );
}
