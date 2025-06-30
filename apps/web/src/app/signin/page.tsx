import React from "react";
import SignIn from "@elearning-fliki/ui/src/components/template/SignIn";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
    const auth = await getAuth();
    if (auth?.user) {
        redirect("/");
    }
    return <SignIn />;
};

export default page;
