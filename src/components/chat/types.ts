import { z } from "zod";

export const schema = z.object({
  user: z.string().min(1, { message: "Username must contain at least 1 character(s)"}),
  message: z.string().min(1, { message: "Message must contain at least 1 character(s)"}),
  timestamp: z.date().default(new Date())
})

export type SchemaType = z.infer<typeof schema>