"use client";
import { CreateCourseValues } from "@elearning-fliki/forms/src/course/schemas";
import { userCreateCourseForm } from "@elearning-fliki/forms/src/course/create-course";
import { useFieldArray } from "react-hook-form";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { Switch } from "../atoms/switch";

export default function CreateCourseForm() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = userCreateCourseForm();

    const { mutateAsync } = trpcClient.course.add.useMutation();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "lessons",
    });

    const onSubmit = async (values: CreateCourseValues) => {
        await mutateAsync(values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-4xl space-y-6 p-4">
            <h2 className="text-2xl font-bold">Create New Course</h2>

            {/* Course Title */}
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

            {/* Course Description */}
            <div>
                <Label title="Course Description" error={errors.description?.message}>
                    <Textarea {...register("description")} placeholder="Description" />
                </Label>
            </div>
            <div>
                <Label title="Publish" error={errors.isPublished?.message}>
                    <Switch {...register("isPublished")} />
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
                                    error={errors.lessons && errors.lessons[index]?.title?.message}
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
                                    error={errors.lessons && errors.lessons[index]?.order?.message}
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
                                error={errors.lessons && errors.lessons[index]?.content?.message}
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
                                error={errors.lessons && errors.lessons[index]?.videoUrl?.message}
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
                >
                    Add Lesson
                </Button>
            </div>

            <div className="w-full text-right">
                <Button type="submit">Create Course</Button>
            </div>
        </form>
    );
}
