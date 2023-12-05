import { z } from "zod";

export const OperatingSystem = z.enum(["Windows", "Linux", "MacOS", "Other"]);
export type OperatingSystem = z.infer<typeof OperatingSystem>;

export const SettingsType = z.enum(["High", "Medium", "Low"]);
export type SettingsType = z.infer<typeof SettingsType>;

export const Report = z.object({
  id: z.number().int().positive().optional(),
  username: z.string().optional(),
  gameId: z.number().int().positive(),
  settingsType: SettingsType,
  operatingSystem: OperatingSystem,
  operatingSystemVersion: z.string(),
  kernelVersion: z.string().optional(),
  processor: z.string(),
  graphicsCard: z.string(),
  randomAccessMemory: z.string(),
  averageFramesPerSecond: z.number().int().positive(),
  resolutionWidth: z.number().int().positive(),
  resolutionHeight: z.number().int().positive(),
  comments: z.string().optional(),
  createdAt: z.string(),
});
export type Report = z.infer<typeof Report>;
