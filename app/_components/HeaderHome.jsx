"use client";

import Logo from "@/components/logo/Logo";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import {
  BookOpen,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Shield,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeaderHome = () => {
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [path]);

  const navItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/dashboard" },
  ];

  const handleNavClick = (itemPath) => {
    router.push(itemPath);
  };

  return (
    <div className="flex items-center p-4 justify-between border-b shadow-md">
      <Logo />

      <div className="flex items-center">
        <ul className="gap-6 hidden md:flex ml-6">
          {navItems.map(({ icon, label, path: itemPath }) => (
            <li
              key={itemPath}
              className={`hover:font-bold hover:text-[#ff0f7b] cursor-pointer transition-all flex gap-2 ${
                path === itemPath ? "font-bold text-[#ff0f7b]" : ""
              }`}
              onClick={() => handleNavClick(itemPath)}
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <ModeToggle />
        {loading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <UserButton />
        )}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[300px] sm:w-[540px]" side={"left"}>
            <Logo />
            <ul className="gap-6 flex flex-col mt-4">
              {navItems.map(({ icon, label, path: itemPath }) => (
                <li
                  key={itemPath}
                  className={`hover:font-bold hover:text-[#ff0f7b] cursor-pointer transition-all flex gap-2 ${
                    path === itemPath ? "font-bold text-[#ff0f7b]" : ""
                  }`}
                  onClick={() => handleNavClick(itemPath)}
                >
                  {icon} {label}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-y-5 mt-10">
              <div className="flex items-center gap-2">
                {loading ? (
                  <Skeleton className="h-12 w-12 rounded-full" />
                ) : (
                  <UserButton />
                )}
                <span>Profile</span>
              </div>
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default HeaderHome;
