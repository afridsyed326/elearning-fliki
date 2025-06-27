import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { Button } from "@elearning-fliki/ui/src/components/atoms/button";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  const auth = await getAuth();

  return (
    <main className="min-h-screen w-full bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Learn Anything, Teach Everything{" "}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            A modern learning platform where teachers can generate courses using
            AI and students can learn at their own pace.
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">What You Can Do</h2>
          <div className="grid md:grid-cols-3 gap-10">
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
                className="text-left rounded-lg shadow-md p-6 bg-gray-50"
              >
                <Image
                  src={img}
                  alt={title}
                  width={400}
                  height={200}
                  className="rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-10 justify-between items-center text-left">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Teachers</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Create or generate AI courses</li>
                <li>Upload videos and materials</li>
                <li>Track student progress</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Students</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Browse and enroll in courses</li>
                <li>Learn with rich interactive content</li>
                <li>Track and resume learning anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Aisha Khan",
                quote:
                  "This platform helped me launch my first online course in just minutes using the AI generator!",
              },
              {
                name: "James Patel",
                quote:
                  "I love how simple and beautiful the UI is. My students are finally engaged!",
              },
            ].map(({ name, quote }) => (
              <div key={name} className="bg-gray-50 p-6 rounded shadow">
                <p className="italic text-gray-700 mb-2">“{quote}”</p>
                <p className="font-semibold text-right">- {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Elearning Fliki. All rights reserved.
      </footer>
    </main>
  );
}
