import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interviews", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("json_mock_resp").notNull(),
  jobPosition: text("job_position").notNull(),
  jobDescription: text("job_description").notNull(),
  jobExperience: text("job_experience").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").notNull(),
  mockId: text("mock_id").notNull(),
});

export const UserAnswer = pgTable("user_answer", {
  id: serial("id").primaryKey(),
  mockIdRef: text("mock_id").notNull(),
  question: text("question").notNull(),
  correctAns: text("correct_ans").notNull(),
  userAns: text("user_ans").notNull(),
  feedback: text("feedback").notNull(),
  rating: text("rating").notNull(),
  userEmail: text("user_email").notNull(),
  createdAt: text("created_at").notNull(),
});
