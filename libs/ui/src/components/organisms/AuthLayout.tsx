import type { BaseComponent } from "../../lib/types";

export interface IAuthLayoutProps extends BaseComponent {
    title: string;
}

export const AuthLayout = ({ children }: IAuthLayoutProps) => {
    return (
        <div className="grid h-screen w-full grid-cols-1 sm:grid-cols-2">
            <div className="hidden sm:block">
                <img
                    className="position-top h-screen w-full object-cover"
                    src="authbg.jpg"
                    alt=""
                />
            </div>

            <div className="bg-secondary flex flex-col justify-center">
                <div className="flex w-full justify-center">
                    <img className="mb-5 w-64" src="logo.png" alt="" />
                </div>
                {children}
            </div>
        </div>
    );
};
