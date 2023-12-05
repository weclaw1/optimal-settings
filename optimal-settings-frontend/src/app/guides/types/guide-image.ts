import { z } from "zod";

export const GuideImage = z.object({
  src: z.string(),
  alt: z.string(),
  attribution: z.string().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type GuideImage = z.infer<typeof GuideImage>;
