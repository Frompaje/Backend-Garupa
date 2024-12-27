export type TransferInput = {
  externalId: string;
  amount: number;
  expectedOn?: string | Date;
  status: "Pending" | "Completed" | "Failed" | "Processing";
};
