import { z } from "zod";

export const AuthSessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  sessionToken: z.string(),
});

export type AuthSession = z.infer<typeof AuthSessionSchema>;
