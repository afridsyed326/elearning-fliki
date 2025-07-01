"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../atoms/button";
import { CircleUserRound } from "lucide-react";
import { Dropdown } from "../atoms/dropdown-menu";

const Navbar = ({ pathname }: { pathname: string }) => {
    const { data: session } = useSession();
    if (["/signin", "/register", "/user-role"].includes(pathname)) {
        return <></>;
    }
    return (
        <div className="mb-14">
            <div className="fixed top-0 flex w-full items-center justify-between bg-transparent bg-white p-3 backdrop-blur-md">
                <div>
                    <img src="/logo.png" alt="eLearning" className="w-32" />
                </div>
                {session?.user ? (
                    <div className="flex items-center gap-2">
                        {session.user.role === "student" ? (
                            <Button>View Enrolled Courses</Button>
                        ) : (
                            <Button>Teachers Platform</Button>
                        )}
                        <div>
                            Hi! <span className="font-bold italic">{session?.user.name}</span>
                        </div>
                        <Dropdown
                            label={<CircleUserRound className="text-primary" />}
                            items={[
                                {
                                    label: "Profile",
                                    onClick: () => alert("Go to Profile"),
                                },
                                {
                                    label: "Settings",
                                    onClick: () => alert("Open Settings"),
                                },
                                { label: "Logout", onClick: () => signOut() },
                            ]}
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <a href="register">
                            <Button>Register</Button>
                        </a>
                        <a href="signin">
                            <Button variant="outline">Sign In</Button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
