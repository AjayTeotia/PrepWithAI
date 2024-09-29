import AuthHeader from "@/components/authHeader/AuthHeader";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center flex-col ">
      <AuthHeader />

      <div className="mt-10">
        <SignUp />
      </div>
    </div>
  );
}
