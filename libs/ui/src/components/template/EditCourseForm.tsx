"use client";
import { CreateCourseValues } from "@elearning-fliki/forms/src/course/schemas";
import { userEditCourseForm } from "@elearning-fliki/forms/src/course/create-course";
import { useFieldArray } from "react-hook-form";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { Switch } from "../atoms/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TRPCClientError } from "@elearning-fliki/trpc-client/src/error";
import CourseImage from "../atoms/course-image";
import { TCourse } from "../../lib/types";

export default function EditCourseForm({ initialData }: { initialData: TCourse }) {
    const {
        control,
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = userEditCourseForm();

    const { mutateAsync } = trpcClient.course.update.useMutation();
    const [isLoading, setIsLoading] = useState(false);
    const currentValues = getValues();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "lessons",
    });

    useEffect(() => {
        reset({ ...initialData, isPublished: initialData.isPublished ? "on" : "off" });
    }, [initialData]);

    const thumbnailUrl = watch("thumbnailUrl");
    const isPublished = watch("isPublished");

    const onSubmit = async (values: CreateCourseValues) => {
        try {
            setIsLoading(true);
            await mutateAsync({
                ...values,
                _id: initialData._id,
            });
            toast.success("Course updated!");
            window.location.href = "/teacher/courses";
        } catch (error: unknown) {
            if (error instanceof TRPCClientError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-lg bg-white/90 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6 p-4">
                <h2 className="text-2xl font-bold">Edit Course</h2>

                {/* Course Title */}
                <div className="grid gap-2 sm:grid-cols-8">
                    <div className="col-span-4 space-y-4">
                        <div>
                            <Label title="Course Title" error={errors.title?.message}>
                                <Input {...register("title")} placeholder="Title" />
                            </Label>
                        </div>
                        <div>
                            <Label title="Thumbnail URL" error={errors.thumbnailUrl?.message}>
                                <Input {...register("thumbnailUrl")} placeholder="https://" />
                            </Label>
                        </div>
                    </div>
                    <div className="col-span-4 mx-auto">
                        <CourseImage
                            src={thumbnailUrl}
                            alt={currentValues.title}
                            className="h-64 w-64 object-cover"
                        />
                    </div>
                </div>

                {/* Course Description */}
                <div>
                    <Label title="Course Description" error={errors.description?.message}>
                        <Textarea {...register("description")} placeholder="Description" />
                    </Label>
                </div>

                {/* Lessons */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Lessons</h3>
                    {fields.map((lesson, index) => (
                        <div key={lesson.id} className="space-y-4 rounded border p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Lesson Title */}
                                <div>
                                    <Label
                                        title="Lesson Title"
                                        error={
                                            errors.lessons && errors.lessons[index]?.title?.message
                                        }
                                    >
                                        <Input
                                            {...register(`lessons.${index}.title`)}
                                            placeholder="Title"
                                        />
                                    </Label>
                                </div>

                                {/* Order */}
                                <div>
                                    <Label
                                        title="Order"
                                        error={
                                            errors.lessons && errors.lessons[index]?.order?.message
                                        }
                                    >
                                        <Input
                                            {...register(`lessons.${index}.order`, {
                                                valueAsNumber: true,
                                            })}
                                            placeholder="Order"
                                        />
                                    </Label>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <Label
                                    title="Content"
                                    error={
                                        errors.lessons && errors.lessons[index]?.content?.message
                                    }
                                >
                                    <Textarea
                                        {...register(`lessons.${index}.content`)}
                                        placeholder="Lesson content..."
                                    />
                                </Label>
                            </div>

                            {/* Video URL */}
                            <div>
                                <Label
                                    title="Video URL (optional)"
                                    error={
                                        errors.lessons && errors.lessons[index]?.videoUrl?.message
                                    }
                                >
                                    <Input
                                        {...register(`lessons.${index}.videoUrl`)}
                                        placeholder="https://"
                                    />
                                </Label>
                            </div>

                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="rounded border border-red-600 px-3 py-1 text-red-600 hover:bg-red-100"
                                >
                                    Remove Lesson
                                </button>
                            </div>
                        </div>
                    ))}

                    <Button
                        onClick={() =>
                            append({
                                title: "",
                                content: "",
                                videoUrl: "",
                                order: fields.length + 1,
                            })
                        }
                        variant={"outline"}
                        className="text-white"
                    >
                        Add Lesson
                    </Button>
                </div>

                <div className="bg-primary sticky bottom-2 flex w-full justify-between rounded-lg p-2 text-right shadow-2xl backdrop-blur-lg">
                    <div className="flex items-center gap-2">
                        <Label
                            title="Publish"
                            error={errors.isPublished?.message}
                            className="mt-1 text-white"
                        />
                        <Switch
                            {...register("isPublished")}
                            onCheckedChange={(val) => {
                                setValue("isPublished", val ? "on" : "off");
                            }}
                            checked={isPublished === "on"}
                        />
                    </div>
                    <Button type="submit" variant={"secondary"} loading={isLoading}>
                        Save Course
                    </Button>
                </div>
            </form>
        </div>
    );
}
