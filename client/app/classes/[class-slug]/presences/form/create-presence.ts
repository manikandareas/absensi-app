import { z } from "zod";

export const createPresenceSchema = z.object({
  isSecure: z.boolean(),
  geolocation: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),
  toleranceTimes: z.coerce.number(),
  expireMinutes: z.coerce.number(),
});
