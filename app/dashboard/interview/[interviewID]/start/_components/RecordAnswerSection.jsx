"use client";

import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

const RecordAnswerSection = () => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const handleRecordClick = () => {
    if (isRecording) {
      stopSpeechToText();
      setWebcamEnabled(false);
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
        variant="outline"
        className="mt-5 w-full max-w-xs"
        onClick={handleRecordClick}
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

      <Button
        onClick={() => console.log(userAnswer)}
        variant="outline"
        className="mt-2 w-full max-w-xs"
      >
        Show User Answer
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
