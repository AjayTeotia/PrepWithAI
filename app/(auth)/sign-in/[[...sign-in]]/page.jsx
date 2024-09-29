import AuthHeader from "@/components/authHeader/AuthHeader";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-5">
      <AuthHeader />

      <SignIn />
    </div>
  );
}
