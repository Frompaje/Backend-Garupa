import { z } from "zod";

export const ListTransferSchema = z.object({
  id: z.string().nonempty(),
})


