import {
  checkAvailabilityService,
  isAvailable,
} from "@/services/users/check-availability";
import { z } from "zod";
export const AccountSchema = z
  .object({
    fullName: z.string().min(3, {
      message: "FullName must be at least 3 characters",
    }),
    universityId: z.string().min(3).max(15),
    role: z.enum(["LECTURER", "STUDENT"]),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password.trim().length > 8, {
    message: "Please use strong password!",
    path: ["password"],
  })
  .refine(
    async (data) => {
      const res = await checkAvailabilityService({
        id: data.universityId,
      }).then((res) =>
        res.data.data?.find((field) => field.field === "university-id"),
      );
      return isAvailable(res?.status!);
    },
    {
      message: "University id already exist!",
      path: ["universityId"],
    },
  );
