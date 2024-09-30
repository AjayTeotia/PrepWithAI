"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInterViewList = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      console.log("Fetched mock interviews:", res);
      setInterviewList(res);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterViewList();
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:grid-cols-3">
        {loading
          ? // Show skeletons while loading
            [...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-lg" />
            ))
          : interviewList.map((item) => (
              <InterviewItemCard key={item.id} item={item} />
            ))}
      </div>
    </div>
  );
};

export default InterviewList;
