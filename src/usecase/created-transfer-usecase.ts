import { TransferRepository } from "../repository";
import { DueDateError } from "../shared/error/due-date-error";
import { InvalidTransferDataError } from "../shared/error/invalid-transfer-data-error";
import { v4 as uuid } from "uuid";

export class CreatedTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}
  async execute({ externalId, amount, expectedOn, status }: Input) {
    if (!externalId || !amount || !status) {
      throw new InvalidTransferDataError();
    }

    const today = new Date();
    if (expectedOn && new Date(expectedOn) > today) {
      throw new DueDateError();
    }

    const id = uuid();

    await this.repository.create({
      id,
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
  status: "Completed" | "Failed" | "Processing";
};
