import { z } from "zod";

export const createCourseSchema = {
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(2000),
    price: z.number().min(0),
    category: z.string().min(2),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
};