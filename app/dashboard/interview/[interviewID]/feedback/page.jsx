"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const GetFeedback = async () => {
    try {
      const res = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewID))
        .orderBy(UserAnswer.id);

      console.log("Feedback data:", res);
      setFeedbackList(res);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetFeedback();
  }, []);

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="text-blue-500 my-3 text-lg">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-green-500">Congratulations</h1>
          <h2 className="font-bold text-2xl">
            Here is your Interview Feedback.
          </h2>
          <h2 className="text-blue-500 my-3 text-lg">
            Your overall interview rating <strong>7/10</strong>
          </h2>
          <h2 className="text-sm text-muted-foreground">
            Find below interview questions with the correct answer, your answer,
            and feedback for improvement.
          </h2>
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(10)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="gap-10">
                <CollapsibleTrigger className="w-full p-2 bg-secondary rounded-lg my-5 text-left flex justify-between gap-7">
                  {item.question}
                  <ChevronsUpDownIcon className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="border p-5 rounded-xl bg-muted-foreground">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-red-500 p-2 border rounded-lg bg-primary-foreground">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong> <br /> {item.userAns}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong> <br /> {item.correctAns}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Feedback: </strong> <br /> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}{" "}
        </div>
      )}

      <Button
        onClick={() => router.replace("/dashboard")}
        disabled={loading}
        className="my-1"
      >
        {loading ? "Loading..." : "Go Dashboard"}
      </Button>
    </div>
  );
};

export default Feedback;
