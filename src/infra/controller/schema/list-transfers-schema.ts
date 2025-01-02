import { z } from "zod";

export const ListTransferSchema = z.object({
  page: z.coerce.number().optional(),
  search: z.string().optional(),
  take: z.coerce.number().optional(),
});
