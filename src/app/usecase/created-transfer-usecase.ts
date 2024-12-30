import { DueDateError } from "../../shared/error/due-date-error";
import { DuplicateExternalIdError } from "../../shared/error/duplicate-external-id-error";
import { InvalidTransferDataError } from "../../shared/error/invalid-transfer-data-error";
import { TransferRepository } from "../repository";
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
    
    const transfer = await this.repository.getTransferByExternalId(externalId);

    if (transfer) {
      throw new DuplicateExternalIdError();
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
