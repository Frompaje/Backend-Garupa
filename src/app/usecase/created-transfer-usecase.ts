import { DueDateError } from "../../shared/error/due-date-error";
import { DuplicateExternalIdError } from "../../shared/error/duplicate-external-id-error";
import { InvalidTransferDataError } from "../../shared/error/invalid-transfer-data-error";
import { TransferRepository } from "../repository";
import { v4 as uuid } from "uuid";

export class CreatedTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}
  async execute({ external_id, amount, expected_on, status }: Input) {
    if (!external_id || !amount || !status) {
      throw new InvalidTransferDataError();
    }

    const today = new Date();
    if (expected_on && new Date(expected_on) > today) {
      throw new DueDateError();
    }

    const transfer = await this.repository.getTransferByExternalId(external_id);

    if (transfer) {
      throw new DuplicateExternalIdError();
    }

    const id = uuid();
    const amountNumber = amount.replace("R$", "").replace(",", ".").trim();
    const formatAmount = Number(amountNumber);

    await this.repository.create({
      id,
      external_id,
      amount: formatAmount,
      expected_on,
      status,
    });
  }
}

export type Input = {
  external_id: string;
  amount: string;
  status: string;
  expected_on?: string;
};
