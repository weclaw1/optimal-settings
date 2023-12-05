"use server";

import { revalidatePath } from "next/cache";

import { ReportFormState } from "./types/report-form";
import { Report } from "./types/report";
import decamelizeKeys from "decamelize-keys";

export async function addReport(
  prevState: ReportFormState,
  formData: FormData,
): Promise<ReportFormState> {
  const formEntries = Array.from(formData.entries()).map(([key, value]) =>
    value === "" ? [key, undefined] : [key, value],
  );
  const report = Report.safeParse({
    ...Object.fromEntries(formEntries),
    gameId: prevState.gameId,
    settingsType: prevState.settingsType,
    averageFramesPerSecond: Number(formData.get("averageFramesPerSecond")),
    resolutionWidth: Number(formData.get("resolutionWidth")),
    resolutionHeight: Number(formData.get("resolutionHeight")),
    createdAt: new Date().toISOString(),
  });

  if (!report.success) {
    return { ...prevState, errors: report.error.flatten() };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(decamelizeKeys(report.data, { deep: true })),
  });

  if (response.ok) {
    revalidatePath(`/games/${prevState.gameSlug}`);
    return { ...prevState, errors: {} };
  } else {
    const { error } = await response.json();
    return {
      ...prevState,
      errors: {
        formErrors: [error],
      },
    };
  }
}
