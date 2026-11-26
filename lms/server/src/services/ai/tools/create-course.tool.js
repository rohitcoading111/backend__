import { z } from "zod";

export const createCourseSchema = {
  title: z
    .string()
    .min(3)
    .max(150)
    .describe("The title of the course"),

  description: z
    .string()
    .min(10)
    .max(2000)
    .describe("A detailed description of the course"),

  price: z
    .number()
    .min(0)
    .describe("The course price in INR"),

  category: z
    .string()
    .min(2)
    .max(50)
    .describe("The course category"),

  level: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .describe("The course difficulty level"),
};