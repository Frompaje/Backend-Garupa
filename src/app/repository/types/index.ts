export type TransferInput = {
  id: string;
  external_id: string;
  amount: number;
  expected_on?: string | Date;
  status: string;
};
