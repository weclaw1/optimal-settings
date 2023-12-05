import { z } from "zod";

export const GameSettingsSources = z.object({
  high: z.string().optional(),
  medium: z.string().optional(),
  low: z.string().optional(),
});

export type GameSettingsSources = z.infer<typeof GameSettingsSources>;
