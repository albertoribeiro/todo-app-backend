import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(129, "Title too long"),
  color: z.string().min(3, "Color is required"),
  completed: z.boolean().optional(),
});

export const taskIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID"),
});