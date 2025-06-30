import React from "react";
import Register from "@elearning-fliki/ui/src/components/template/Register";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
    const auth = await getAuth();
    if (auth?.user) {
        redirect("/");
    }
    return <Register />;
};

export default page;
