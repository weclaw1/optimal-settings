import { z } from "zod";

export const LoginCredentials = z.object({
  username: z.string(),
  password: z.string(),
});
export type LoginCredentials = z.infer<typeof LoginCredentials>;
