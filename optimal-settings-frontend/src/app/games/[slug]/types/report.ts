import { z } from "zod";

export const OperatingSystem = z.enum(["Windows", "Linux", "MacOS", "Other"]);
export type OperatingSystem = z.infer<typeof OperatingSystem>;

export const SettingsType = z.enum(["High", "Medium", "Low"]);
export type SettingsType = z.infer<typeof SettingsType>;

export const Report = z.object({
  id: z.number().int().positive().optional(),
  username: z.string().max(50).optional(),
  gameId: z.number().int().positive(),
  settingsType: SettingsType,
  operatingSystem: OperatingSystem,
  operatingSystemVersion: z.string().max(50),
  kernelVersion: z.string().max(50).optional(),
  processor: z.string().max(50),
  graphicsCard: z.string().max(50),
  randomAccessMemory: z.string().max(20),
  averageFramesPerSecond: z.number().int().positive(),
  resolutionWidth: z.number().int().positive(),
  resolutionHeight: z.number().int().positive(),
  comments: z.string().max(500).optional(),
  createdAt: z.string(),
  captchaToken: z.string().optional(),
});
export type Report = z.infer<typeof Report>;
