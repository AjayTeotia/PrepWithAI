import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ item }) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${item?.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${item?.mockId}/feedback`);
  };

  return (
    <div className="border shadow-md rounded-lg my-5 p-3">
      <h2 className="font-bold my-2 text-lg text-[#ff0f7b]">
        {item?.jobPosition}
      </h2>

      <h2 className="font-bold my-2 text-md text-muted-foreground ">
        {item?.jobExperience} Years of experience
      </h2>

      <h2 className="font-bold text-xs my-2 text-muted-foreground ">
        Create At: {item?.createdAt}
      </h2>

      <div className="flex justify-between mt-2 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedback}
        >
          Feedback
        </Button>

        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
