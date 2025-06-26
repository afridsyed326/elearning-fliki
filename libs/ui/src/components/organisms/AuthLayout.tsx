import type { BaseComponent } from "../../lib/types";

export interface IAuthLayoutProps extends BaseComponent {
  title: string;
}

export const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-screen object-cover position-top"
          src="authbg.jpg"
          alt=""
        />
      </div>

      <div className="bg-secondary flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <img className="mb-5 w-64" src="logo.png" alt="" />
        </div>
        {children}
      </div>
    </div>
  );
};
