import { TransferRepository } from "../repositories";
import { DateExpiredError } from "../shared/error/date-expired-error";
import { InvalidTransferDataError } from "../shared/error/invalid-transfer-data-error";

export class CreatedTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}
  async execute({ externalId, amount, expectedOn, status }: Input) {
    if (!externalId || !amount || !status) {
      throw new InvalidTransferDataError();
    }

    const today = new Date();

    if (expectedOn && new Date(expectedOn) < today) {
      throw new DateExpiredError();
    }

    await this.repository.create({
      externalId,
      amount,
      expectedOn,
      status,
    });
  }
}

export type Input = {
  externalId: string;
  amount: number;
  expectedOn?: string | Date;
  status: "Pending" | "Completed" | "Failed" | "Processing";
};
