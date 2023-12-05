"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginFormState } from "./types/login-form";
import { LoginCredentials } from "./types/login";

export async function login(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const formEntries = Array.from(formData.entries()).map(([key, value]) =>
    value === "" ? [key, undefined] : [key, value],
  );
  const loginCredentials = LoginCredentials.safeParse(
    Object.fromEntries(formEntries),
  );

  if (!loginCredentials.success) {
    return { ...prevState, errors: loginCredentials.error.flatten() };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCredentials.data),
  });

  if (response.ok) {
    const { token } = await response.json();
    cookies().set("token", token, { maxAge: 60 * 60 * 24 });
    redirect("/admin");
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
