import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  universityId: z.string().min(3).max(15),
  role: z.enum(["LECTURER", "STUDENT"]),
});
