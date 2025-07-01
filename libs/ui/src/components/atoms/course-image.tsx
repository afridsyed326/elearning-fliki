"use client";

import { cn } from "../../lib/utils";

type Props = {
    src: string;
    className: string;
    alt?: string;
};

const CourseImage = ({ src, alt, className }: Props) => {
    return (
        <img
            src={
                src ||
                "https://images.unsplash.com/vector-1748272331255-d143f4c294fc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={alt || "Course Image"}
            className={cn(src ? "" : "opacity-50", className)}
        />
    );
};

export default CourseImage;
