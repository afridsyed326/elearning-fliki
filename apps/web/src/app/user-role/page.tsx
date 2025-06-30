import React from "react";
import DefineRole from "@elearning-fliki/ui/src/components/template/DefineRole";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
    const auth = await getAuth();

    if (auth?.user && auth.user.role) {
        return redirect("/");
    }

    return (
        <div>
            <DefineRole />
        </div>
    );
};

export default page;
