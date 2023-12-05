import { z } from "zod";
import { GuideImage } from "./guide-image";

export const Guide = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: z.string(),
  image: GuideImage,
  content: z.string().optional(),
});

export type Guide = z.infer<typeof Guide>;
