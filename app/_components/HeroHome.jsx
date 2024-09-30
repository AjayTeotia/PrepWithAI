"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const HeroHome = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="flex items-center flex-col bg-background pb-32 p-3">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl leading-tight tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#ff0f7b] to-[#f89b29] font-bold bg-clip-text text-transparent">
              PrepWithAI
            </span>
          </h1>

          <br />
          <h2 className="text-3xl font-bold sm:text-4xl leading-tight tracking-tight text-rose-500">
            The AI Mock Interview Preparation Tool
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Get started with the PrepWithAI platform to prepare for mock
            interviews.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button>{isSignedIn ? "Go to Dashboard" : "Get Started"}</Button>
            </Link>
          </div>
        </div>
      </div>

      <Image
        className="-mt-9 rounded-xl border-8"
        src="/dashboard.png"
        alt="Dashboard"
        width={1000}
        height={700}
      />
    </section>
  );
};

export default HeroHome;
