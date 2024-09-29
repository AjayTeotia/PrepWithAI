import React from "react";
import Logo from "../logo/Logo";
import { ModeToggle } from "../modeToggle/ModeToggle";

const AuthHeader = () => {
  return (
    <div className="fixed top-0 border-b w-full flex items-center justify-between p-5 shadow-md">
      <div>
        <Logo />
      </div>

      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthHeader;
