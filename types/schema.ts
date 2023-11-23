import { z } from "zod";
import { Remitter } from "./remitter";

// const r1BooleanSchema = z.custom<`${string}`>((val) => {
//   return val == "true" || value == "1" || value == "t";
// });

// type r1Boolean = z.infer<typeof r1BooleanSchema>;

// export const AuthSessionSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   username: z.string(),
//   sessionToken: z.string(),
//   remitter: remitterSchema.optional(),
// });

// export type AuthSession = z.infer<typeof AuthSessionSchema>;
