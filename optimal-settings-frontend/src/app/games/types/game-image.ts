import { z } from "zod";

export const GameImage = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type GameImage = z.infer<typeof GameImage>;
