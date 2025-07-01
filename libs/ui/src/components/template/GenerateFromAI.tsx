"use client";
import { trpcClient } from "@elearning-fliki/trpc-client/src/client";
import { useGenerateAICourseForm } from "@elearning-fliki/forms/src/course/create-course";
import { GenearteAICourseValues } from "@elearning-fliki/forms/src/course/schemas";
import { Label } from "../atoms/label";
import { Button } from "../atoms/button";
import { toast } from "sonner";
import { TRPCClientError } from "@elearning-fliki/trpc-client/src/error";
import { Textarea } from "../atoms/textarea";
import { useState } from "react";
import { TCourse } from "../../lib/types";
import { aiOutputExample } from "../../lib/ai-output-example";
import { Sparkles } from "lucide-react";

const GenerateFromAI = ({
    setValues,
    mockResult,
}: {
    setValues: (_values: TCourse) => void;
    mockResult?: boolean;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useGenerateAICourseForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: GenearteAICourseValues) => {
        if (mockResult) {
            setValues(aiOutputExample);
            return;
        }
        try {
            setIsLoading(true);
            const res = await mutateAsync(data);
            toast("Course generated successfully!");
            setValues({ ...res, isPublished: "on" });
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
    const { mutateAsync } = trpcClient.course.generate.useMutation();
    return (
        <div>
            <div className="mx-auto flex flex-col justify-center p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-2 flex flex-col gap-2">
                    <Label title="Prompt" error={errors?.prompt?.message}>
                        <Textarea
                            {...register("prompt")}
                            placeholder="Generate a course about..."
                            className="min-h-48"
                        />
                    </Label>
                    <Button type="submit" className="gap-3" variant={"default"} loading={isLoading}>
                        Generate <Sparkles className="w-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default GenerateFromAI;
