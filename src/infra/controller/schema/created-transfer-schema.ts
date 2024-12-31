import { z } from "zod";

export const CreatedTransferSchema = z.object({
  external_id: z
    .string()
    .max(6)
    .min(1, "ID Externo deve ter pelo menos 1 caractere."),
  amount: z.string(),
  status: z.enum(["Aprovado", "Recusado", "Em analise"]),
  expected_on: z.string().optional(),
});
