import { z } from "zod";

export const contactsSchema = z.object({
  numberPhone: z.string().max(15).optional(),
  instagram: z.string().max(50).optional(),
  whatsApp: z.string().max(15).optional(),
  telegram: z.string().max(50).optional(),
  facebook: z.string().max(50).optional(),
});
