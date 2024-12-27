export type TransferInput = {
  id: string;
  externalId: string;
  amount: number;
  expectedOn: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Processing';
  createdAt: string;
  updatedAt: string;
};
