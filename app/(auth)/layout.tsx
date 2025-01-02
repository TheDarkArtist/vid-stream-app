import Logo from "@/components/logo";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
