import { z } from "zod";

export const GetTransferSchema = z.object({
  id: z.string().nonempty(),
})


