"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModel";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);

    console.log(jobPosition, jobDescription, jobExperience);
    e.preventDefault();

    const InputPrompt =
      "Job position: " +
      jobPosition +
      ", Job Description: " +
      jobDescription +
      " and Years of Experience: " +
      jobExperience +
      ". Generate " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview question and answer in JSON format";

    const res = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = res.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResponse));

    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID", response);

      if (response) {
        setOpenDialog(false)
      }
    } else {
      console.log("some error");
    }
    setLoading(false);

    setJobPosition("");
    setJobDescription("");
    setJobExperience("");
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg hover:cursor-pointer hover:scale-105 hover:shadow-md transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-xl text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-2">
                  <h2 className="font-medium">
                    Add details about your Job Position/role, Job Description,
                    and Year of Experience
                  </h2>
                </div>

                <div className="my-3 mt-7">
                  <label htmlFor="job-role">Job Role/Job Position</label>
                  <Input
                    id="job-role"
                    placeholder="Ex: Full Stack Developer"
                    type="text"
                    required
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="job-description">
                    Job Description/Tech Stack (In short)
                  </label>
                  <Textarea
                    id="job-description"
                    placeholder="Ex: React, Node, MongoDB, ..."
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="years-experience">Year of Experience</label>
                  <Input
                    id="years-experience"
                    placeholder="Ex: 5"
                    max="50"
                    type="number"
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
