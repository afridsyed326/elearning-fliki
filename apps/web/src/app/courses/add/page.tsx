import React from "react";
import CreateCourseForm from "@elearning-fliki/ui/src/components/template/CreateCourseForm";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
    const auth = await getAuth();

    if (auth?.user && auth.user.role !== "teacher") {
        return redirect("/");
    }
    return (
        <div className="h-full bg-slate-200">
            <CreateCourseForm />
        </div>
    );
};

export default page;
