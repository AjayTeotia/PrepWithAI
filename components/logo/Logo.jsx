import { Bot } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2">
      {/*Icon*/}
      <Bot className="w-11 h-11 stroke stroke-[2] stroke-[#ff0f7b]" />

      <p className="bg-gradient-to-r from-[#ff0f7b] to-[#f89b29] font-bold bg-clip-text text-transparent text-3xl">
        PrepAI
      </p>
    </a>
  );
};

export default Logo;
