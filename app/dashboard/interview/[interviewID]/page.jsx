"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState("");
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  const getInterViewDetails = async () => {
    const res = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewID));

    // console.log("res", res);
    setInterviewData(res[0]);
  };

  useEffect(() => {
    getInterViewDetails();
    //console.log(params.interviewID);
  }, []);

  return (
    <div className="my-10  flex-col ">
      <h2 className="font-bold text-2xl">Let's get started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className=" flex flex-col p-5 rounded-lg border gap-5">
          <div className="my-5 flex flex-col gap-5">
            <h2 className="text-lg">
              <strong>Job Role/ Job Position:</strong>
              {interviewData.jobPosition}
            </h2>

            <h2 className="text-lg">
              <strong>Job Description/ Tech Stack:</strong>{" "}
              {interviewData.jobDescription}
            </h2>

            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewData.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-blue-500 bg-blue-300">
            <h2 className="flex gap-2 items-center font-bold text-blue-500 mb-2">
              <Lightbulb />{" "}
              <span>
                <strong>Information</strong>
              </span>
            </h2>
            <h2 className="text-blue-500">
              Enable video webcam and microphone to start your AI Generated Mock
              Interview. It has 10 questions which you can answer and at last,
              you will get a report based on your answers. Note: We never record
              your video; webcam access can be disabled at any time if you want.
            </h2>
          </div>
        </div>

        <div className="">
          {webcamEnabled ? (
            <div className="flex justify-center items-center">
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                style={{ width: 500, height: 300 }}
                mirrored={true}
              />
            </div>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-gray-300 rounded-lg border-2" />{" "}
              <div className="flex justify-center items-center ">
                <Button variant="ghost" onClick={() => setWebcamEnabled(true)}>
                  Enable Webcam and Microphone
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Button>Start Interview</Button>
      </div>
    </div>
  );
};

export default Interview;
