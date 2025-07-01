import React from "react";
import { getAuth } from "@elearning-fliki/network/src/auth/authOptions";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

const AuthedWrapper = async ({ children }: Props) => {
    const auth = await getAuth();

    if (!auth?.user) {
        return redirect("/");
    }
    return <div>{children}</div>;
};

export default AuthedWrapper;
