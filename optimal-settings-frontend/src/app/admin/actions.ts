"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteReport(id: number) {
  const response = await fetch(`${process.env.BACKEND_URL}/reports/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  if (response.ok) {
    revalidatePath("/games/[slug]", "page");
    revalidatePath("/admin");
  }
}
