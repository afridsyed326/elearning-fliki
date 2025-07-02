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
        <div className="">
            <div className="fixed left-[80px] right-[80px] top-0 flex items-center justify-between rounded-b-lg bg-white/80 p-3 backdrop-blur-md">
                <a href="/">
                    <div>
                        <img
                            src={
                                session?.user.role === "teacher" ? "/logo-teacher.png" : "/logo.png"
                            }
                            alt="eLearning"
                            className="w-32"
                        />
                    </div>
                </a>
                {session?.user ? (
                    <div className="flex items-center gap-2">
                        {session.user.role === "student" ? (
                            <a href="/courses/enrolled">
                                <Button>View Enrolled Courses</Button>
                            </a>
                        ) : (
                            <a href="/teacher/courses">
                                <Button>Teachers Platform</Button>
                            </a>
                        )}
                        <div>
                            Welcome Back!{" "}
                            <span className="font-bold italic">{session?.user.name}</span>
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
                                {
                                    label: "Logout",
                                    onClick: async () => {
                                        await signOut();
                                        window.location.href = "/";
                                    },
                                },
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
