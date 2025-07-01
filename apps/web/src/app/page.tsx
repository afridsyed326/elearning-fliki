import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { trpc } from "@elearning-fliki/trpc-client/src";
import { Button } from "@elearning-fliki/ui/src/components/atoms/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CourseCard from "@elearning-fliki/ui/src/components/organisms/CourseCard";
import { TCourse } from "@elearning-fliki/ui/src/lib/types";

export default async function LandingPage() {
    const auth = await getAuth();

    if (auth?.user && !auth.user.role) {
        return redirect("/user-role");
    }

    const courses = await trpc.course.topCourses.query();

    return (
        <main className="min-h-screen w-full bg-white text-gray-900">
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-20">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                        Learn Anything, Teach Everything{" "}
                    </h1>
                    <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600 md:text-xl">
                        A modern learning platform where teachers can generate courses using AI and
                        students can learn at their own pace.
                    </p>
                    {auth?.user ? (
                        <div className="flex justify-center gap-4">
                            <Link href="/courses" passHref>
                                <Button size="lg">Browse Courses</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4">
                            <Link href="/register" passHref>
                                <Button size="lg">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Features */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="mb-10 text-3xl font-semibold">What You Can Do</h2>
                    <div className="grid gap-10 md:grid-cols-3">
                        {[
                            {
                                title: "Generate AI Courses",
                                desc: "Teachers can use AI to generate rich learning content instantly.",
                                img: "/images/aicourses.jpg",
                            },
                            {
                                title: "Interactive Lessons",
                                desc: "Engage with videos, quizzes, and rich content at your pace.",
                                img: "/images/interactive.webp",
                            },
                            {
                                title: "Track Progress",
                                desc: "Students can track their learning journey with milestones.",
                                img: "/images/progress.jpg",
                            },
                        ].map(({ title, desc, img }) => (
                            <div
                                key={title}
                                className="rounded-lg bg-gray-50 p-6 text-left shadow-md"
                            >
                                <Image
                                    src={img}
                                    alt={title}
                                    width={400}
                                    height={200}
                                    className="mb-4 rounded"
                                />
                                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                                <p className="text-gray-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto text-center">
                <h2 className="mb-12 text-3xl font-semibold">Featured Courses</h2>
                <div className="grid grid-cols-3 gap-5 px-6">
                    {courses.map((course: TCourse) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="bg-blue-50 px-6 py-20">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="mb-12 text-3xl font-semibold">How It Works</h2>
                    <div className="flex flex-col items-center justify-between gap-10 text-left md:flex-row">
                        <div className="flex-1">
                            <h3 className="mb-2 text-xl font-bold">Teachers</h3>
                            <ul className="list-inside list-disc space-y-1 text-gray-600">
                                <li>Create or generate AI courses</li>
                                <li>Upload videos and materials</li>
                                <li>Track student progress</li>
                            </ul>
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-2 text-xl font-bold">Students</h3>
                            <ul className="list-inside list-disc space-y-1 text-gray-600">
                                <li>Browse and enroll in courses</li>
                                <li>Learn with rich interactive content</li>
                                <li>Track and resume learning anytime</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-10 text-3xl font-semibold">What People Say</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            {
                                name: "Aisha Khan",
                                quote: "This platform helped me launch my first online course in just minutes using the AI generator!",
                            },
                            {
                                name: "James Patel",
                                quote: "I love how simple and beautiful the UI is. My students are finally engaged!",
                            },
                        ].map(({ name, quote }) => (
                            <div key={name} className="rounded bg-gray-50 p-6 shadow">
                                <p className="mb-2 italic text-gray-700">“{quote}”</p>
                                <p className="text-right font-semibold">- {name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 px-6 py-8 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Elearning Fliki. All rights reserved.
            </footer>
        </main>
    );
}
