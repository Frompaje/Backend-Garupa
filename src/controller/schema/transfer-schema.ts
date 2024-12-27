import { z } from "zod";


export const transferSchema = z.object({
  externalId: z.string(),
  amount: z.number(),
  expectedOn: z.string().date(),
  status:z.enum(["Pending", "Completed", "Failed", "Processing"])
})


