import { z } from "zod";
export const SignInSchema = z.object({
  email: z.string().email({ message: "Input should be a valid email" }),
  password: z.string(),
});
