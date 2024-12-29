export type TransferInput = {
  id: string;
  externalId: string;
  amount: number;
  expectedOn?: string | Date;
  status:  "Completed" | "Failed" | "Processing";
};
