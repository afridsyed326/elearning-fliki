import OpenAI from "openai";
import { TCourse } from "@elearning-fliki/ui/src/lib/types";
require("dotenv").config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const generateCourseFromPrompt = async (
    prompt: string,
    teacher: { name: string; email: string }
): Promise<TCourse> => {
    const systemPrompt = `
        You are an expert course creator. Your task is to generate educational content in JSON format that matches the following TypeScript structure:

        interface TLesson {
        title: string;
        content: string;
        videoUrl?: string;
        order: number;
        }

        interface TCourse {
        title: string;
        description: string;
        thumbnailUrl: string;
        lessons: TLesson[];
        }

        ⚠️ Format your entire response as JSON only. Do not include explanations or markdown code blocks.
        - Keep lesson count between 4 to 8.
        - The thumbnailUrl can be a placeholder like "https://source.unsplash.com/featured/?education".
        - Ensure lesson order starts from 1 and increments.
        - must return json that matches TCourse type only.
        - dont fill image and video dummy urls, instead use empty string
        - The content field inside ILesson must contain the 'how to' part of the lesson, so use minimum 150 words.
        Now generate a course on: "${prompt}".`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Or gpt-3.5-turbo
        messages: [
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content: `Teacher name: ${teacher.name}, email: ${teacher.email}`,
            },
        ],
        temperature: 0.7,
    });

    const json = completion.choices[0].message?.content ?? "{}";
    return JSON.parse(json) as TCourse;
};
