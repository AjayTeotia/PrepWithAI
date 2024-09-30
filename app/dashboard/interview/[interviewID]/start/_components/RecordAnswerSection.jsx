"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, WebcamIcon } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const currentQuestion =
    mockInterviewQuestion &&
    activeQuestionIndex >= 0 &&
    activeQuestionIndex < mockInterviewQuestion.length
      ? mockInterviewQuestion[activeQuestionIndex].question
      : null;

  const saveUserAnswer = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
      setWebcamEnabled(false);

      if (
        !mockInterviewQuestion ||
        activeQuestionIndex < 0 ||
        activeQuestionIndex >= mockInterviewQuestion.length
      ) {
        toast.error("No valid question available.");
        return;
      }

      const currentQuestion =
        mockInterviewQuestion[activeQuestionIndex]?.question;

      const currentAnswer = mockInterviewQuestion[activeQuestionIndex]?.answer;

      if (!currentQuestion) {
        toast.error("Current question is not available.");
        return;
      }

      const feedbackPrompt =
        "Question: " +
        currentQuestion +
        ", User Answer: " +
        userAnswer +
        ", Depends on question and user answer for given interview question " +
        "please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";

      try {
        const res = await chatSession.sendMessage(feedbackPrompt);
        const MockJsonResponse = await res.response
          .text()
          .replace("```json", "")
          .replace("```", "");

        const JsonFeedbackResponse = JSON.parse(MockJsonResponse);

        // Check if interviewData and mockId exist
        if (!interviewData || !interviewData.mockId) {
          toast.error("Interview data is not available.");
          setLoading(false);
          return;
        }

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData.mockId,
          question: currentQuestion,
          correctAns: currentAnswer,
          userAns: userAnswer,
          feedback: JsonFeedbackResponse?.feedback,
          rating: JsonFeedbackResponse?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        });

        /* console.log({
          mockIdRef: interviewData.mockId,
          question: currentQuestion,
          correctAns: currentAnswer,
          userAns: userAnswer,
          feedback: JsonFeedbackResponse?.feedback,
          rating: JsonFeedbackResponse?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        });*/

        if (resp) {
          //console.log("Database response:", resp);
          toast.success("Answer saved successfully.");
          setUserAnswer("");
          setResults([]);
        } else {
          toast.error("Failed to save answer to the database.");
        }
        
        setResults([]);
        setUserAnswer("");
      } catch (error) {
        console.error("Error saving user answer:", error);
        toast.error("Error while saving your answer.");
      } finally {
        setLoading(false);
      }
    } else {
      startSpeechToText();
      setWebcamEnabled(true);
    }
  };

  // Handle results and update userAnswer
  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript + " ");
    });
  }, [results]);

  // Handle error state
  if (error) {
    return (
      <p className="text-red-600 flex flex-col items-center j justify-center font-bold text-center text-3xl mb-5">
        Web Speech API is not available in this browser 🤷‍
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      <div className="flex flex-col items-center justify-center bg-secondary rounded-xl p-5 mt-14 w-full max-w-lg h-80 md:h-96">
        {webcamEnabled ? (
          <Webcam style={{ width: "100%", height: "100%" }} mirrored={true} />
        ) : (
          <WebcamIcon width={300} height={150} />
        )}
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="mt-5 w-full max-w-xs"
        onClick={saveUserAnswer}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex items-center">
            <Mic className="mr-2" />
            Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
