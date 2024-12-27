import { z } from "zod";


export const transferSchema = z.object({
  value: z.number(),
  pixKey: z.string().nonempty(),
  date: z.string().datetime(),
  dueDate:z.string().datetime().optional()
})
