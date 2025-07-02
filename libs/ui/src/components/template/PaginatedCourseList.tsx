"use client";

import { useState } from "react";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "../atoms/pagination";
import CourseCard from "../organisms/CourseCard";
import { TCourse } from "../../lib/types";
import { Input } from "../atoms/input";
import { Search } from "lucide-react";
import { Button } from "../atoms/button";

const LIMIT = 10;

export const PaginatedCourseList = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filters, setFilters] = useState({
        page: 1,
        limit: LIMIT,
        search: "",
    });

    const { data, isLoading, isError } = trpcClient.course.getPaginatedCourses.useQuery({
        page: filters.page,
        limit: filters.limit,
        search: filters.search,
    });

    const handleSearch = () => {
        setFilters({ page: 1, search: searchInput, limit: LIMIT });
    };

    if (isLoading) return <p className="text-center">Loading courses...</p>;
    if (isError || !data) return <p className="text-center">Failed to load courses</p>;

    const { courses, totalPages } = data as { courses: TCourse[]; totalPages: number };

    return (
        <div className="space-y-6 pb-20">
            <div className="mt-2 justify-between rounded-lg px-4 py-5 sm:flex">
                <h2 className="text-2xl font-bold">All Courses</h2>
                <div className="flex w-1/3 justify-end gap-1">
                    <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search courses"
                        className="min-w-[400px]"
                    />
                    <Button className="gap-2" onClick={handleSearch}>
                        Search <Search className="w-5" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 px-5 sm:px-20 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course: any) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        page: Math.max(1, prev.page - 1),
                                    }))
                                }
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={i + 1 === filters.page}
                                    onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
                                    href="#"
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        page: Math.min(totalPages, prev.page + 1),
                                    }))
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};
