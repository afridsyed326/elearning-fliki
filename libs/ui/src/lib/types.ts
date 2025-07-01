import type { ReactNode } from "react";

export type BaseComponent = {
    children?: ReactNode;
    className?: string;
};

export type MenuItem = { label: string; href: string; loggedIn: boolean };

export type TLesson = {
    title: string;
    content: string;
    videoUrl?: string;
    order: number;
};

export type TCourse = {
    _id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    teacher: {
        name: string;
        email: string;
    };
    createdAt: string;
    lessons: TLesson[];
};

export type TStudentEnrollment = {
    student: string;
    course: string;
    progress: number;
    completedLessons: number[];
    enrolledAt: Date;
};
