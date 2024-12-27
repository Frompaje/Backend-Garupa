export type TransferInput = {
  externalId: string;
  amount: number;
  expectedOn?: string | Date;
  status:  "Completed" | "Failed" | "Processing";
};
