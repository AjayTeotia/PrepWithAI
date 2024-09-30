"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState("");
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const getInterViewDetails = async () => {
    const res = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewID));

    //console.log("res", res);

    const JsonMockResponse = JSON.parse(res[0].jsonMockResp);

    // console.log(JsonMockResponse);

    setInterviewData(res[0]);
    setMockInterviewQuestion(JsonMockResponse);
  };

  useEffect(() => {
    //console.log(params.interviewID);
    getInterViewDetails();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Question*/}
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video and audion recoding question Answer*/}
        <RecordAnswerSection />
      </div>
    </div>
  );
};

export default StartInterview;
