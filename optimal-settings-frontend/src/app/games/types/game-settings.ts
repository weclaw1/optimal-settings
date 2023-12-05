import { z } from "zod";

export const GameSettings = z.object({
  high: z.array(z.tuple([z.string(), z.string()])).optional(),
  medium: z.array(z.tuple([z.string(), z.string()])).optional(),
  low: z.array(z.tuple([z.string(), z.string()])).optional(),
  additionalInformations: z.string().optional(),
});

export type GameSettings = z.infer<typeof GameSettings>;
