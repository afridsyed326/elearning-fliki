import { ICourse, IEnrollment, IPartialCourse } from "./interfaces";
import { CourseModel } from "./models/CourseModel";
import { Enrollment } from "./models/EnrollmentModel";

/**
 * Create a new course
 */
export async function createCourse(
    data: {
        description?: string;
        title?: string;
        thumbnailUrl?: string;
        lessons?: {
            title?: string;
            content?: string;
            order?: number;
            videoUrl?: string;
        }[];
        isPublished?: string;
    },
    teacher: string
): Promise<ICourse> {
    const course = await CourseModel.create({
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        isPublished: data.isPublished === "on",
        teacher: teacher,
        lessons: data.lessons,
    });
    return course;
}

/**
 * Update an existing course
 */
export async function updateCourse(
    courseId: string,
    updates: IPartialCourse
): Promise<ICourse | null> {
    delete updates._id;
    return CourseModel.findByIdAndUpdate(
        courseId,
        { ...updates, isPublished: updates.isPublished === "on" },
        { new: true }
    );
}

/**
 * Enroll a student in a course
 */
export async function enrollStudent(studentId: string, courseId: string): Promise<IEnrollment> {
    // Prevent duplicate enrollments
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return existing;

    return Enrollment.create({
        student: studentId,
        course: courseId,
        progress: 0,
        completedLessons: [],
    });
}

export async function enrolledCourses(studentId: string): Promise<ICourse[]> {
    // Prevent duplicate enrollments
    const enrollments = await Enrollment.find({ student: studentId }).populate<ICourse>(
        "course course.teacher"
    );
    return enrollments.map((e) => e.course as unknown as ICourse);
}

export async function getCourseProgress(
    studentId: string,
    courseId: string
): Promise<IEnrollment | null> {
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return existing;
    return null;
}

/**
 * Update course progress for a student
 */
export async function updateCourseProgress(
    studentId: string,
    courseId: string,
    completedLessonOrder: number
): Promise<IEnrollment | null> {
    const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (!enrollment) return null;

    // Add lesson if not already completed
    if (!enrollment.completedLessons.includes(completedLessonOrder)) {
        enrollment.completedLessons.push(completedLessonOrder);
        // Calculate progress as percentage of lessons completed
        const course = await CourseModel.findById(courseId);
        if (course && course.lessons.length > 0) {
            enrollment.progress = Math.round(
                (enrollment.completedLessons.length / course.lessons.length) * 100
            );
        }
        await enrollment.save();
    }
    return enrollment;
}

/**
 * Get all courses (optionally filter by teacher)
 */
export async function getCourses(teacherId?: string): Promise<ICourse[]> {
    const filter = teacherId ? { teacher: teacherId } : {};
    return CourseModel.find(filter).populate("teacher");
}

/**
 * Get a single course by ID
 */
export async function getCourseById(courseId: string): Promise<ICourse | null> {
    return CourseModel.findById(courseId).populate("teacher");
}
