"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Volume2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [loading, setLoading] = useState(true);
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      
    

      window.speechSynthesis.speak(speech);
      setHasSpoken(true); // Mark that we've spoken
    } else {
      console.log("Sorry, your browser does not support speech synthesis.");
    }
  };

  return (
    <div className="p-5 rounded-lg border my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-8 rounded-full" />
            ))
          : mockInterviewQuestion.map(({ question }, index) => (
              <h2
                className={`p-2 rounded-full border text-xs md:text-sm text-center text-muted-foreground cursor-pointer ${
                  activeQuestionIndex === index ? "bg-primary text-primary-foreground" : ""
                }`}
                key={index}
              >
                Question #{index + 1}
              </h2>
            ))}
      </div>

      {loading ? (
        <Skeleton className="h-6 my-5" />
      ) : (
        mockInterviewQuestion[activeQuestionIndex] && (
          <div>
            <h2 className="text-md md:text-lg my-5">
              {mockInterviewQuestion[activeQuestionIndex].question}
            </h2>

            <Volume2Icon
              className="cursor-pointer"
              onClick={() => {
                if (!hasSpoken) {
                  textToSpeech(mockInterviewQuestion[activeQuestionIndex].question);
                }
              }}
            />
          </div>
        )
      )}

      <div className="p-5 border rounded-lg border-blue-500 bg-blue-300 mt-20">
        <h2 className="flex gap-2 items-center font-bold text-blue-500 mb-2">
          <Lightbulb />{" "}
          <span>
            <strong>Note</strong>
          </span>
        </h2>
        <h2 className="text-sm text-blue-500">
          Click on Record Answer when you want to answer the question. At the
          end of the interview we will give you the feedback along with your
          correct answer for each question and your answer to compare it with
          the correct answer.
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
