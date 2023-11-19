"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ReportFormState } from "./types/report-form";

export async function addReport(
  prevState: ReportFormState,
  formData: FormData,
) {
  const reportSchema = z.object({
    username: z.string(),
    operatingSystem: z.enum(["windows", "linux", "macos", "other"]),
    operatingSystemVersion: z.string(),
    kernelVersion: z.string().optional(),
    cpu: z.string(),
    gpu: z.string(),
    ram: z.string(),
    fps: z.coerce.number().int().positive(),
    resolution: z
      .string()
      .regex(/^\d{3,5}x\d{3,5}$/, {
        message:
          "Invalid value, resolution should match pattern /^\\d{3,5}x\\d{3,5}$/, for example 2560x1440",
      }),
    comments: z.string().optional(),
  });

  const report = reportSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!report.success) {
    return { ...prevState, errors: report.error.flatten() };
  }

  return { ...prevState, errors: {} };
  // const response = await fetch(`/api/games/${prevState.gameId}/reports/${prevState.settingsType}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(report.data),
  // });

  // if (response.ok) {
  //   revalidatePath(`/games/${prevState.gameSlug}`);
  // } else {
  //   const errors = await response.json();
  //   return { ...prevState, errors };
  // }
}
