import { z } from "zod";

export const createClassSchema = z.object({
  title: z.string().min(3).max(50),
  descriptions: z.string().min(5),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9-]+$/),
  invitationToken: z.string().min(6).optional(),
});
