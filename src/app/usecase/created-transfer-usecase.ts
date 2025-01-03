import { setStatustTransfer } from "../../helpers/setStatustTransfer";
import { DuplicateExternalIdError } from "../../shared/error/duplicate-external-id-error";
import { InvalidTransferDataError } from "../../shared/error/invalid-transfer-data-error";
import { TransferRepository } from "../repository";
import { v4 as uuid } from "uuid";

export class CreatedTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}
  async execute({ external_id, amount, expected_on }: Input) {
    let status;

    if (!external_id || !amount) {
      throw new InvalidTransferDataError();
    }

    if (expected_on) {
       status = setStatustTransfer(expected_on);
    }

    const transfer = await this.repository.getByExternalId(external_id);

    if (transfer) {
      throw new DuplicateExternalIdError();
    }

    const id = uuid();

    const amountNumber = amount
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();
    const formatAmount = Number(amountNumber);

    await this.repository.create({
      id,
      external_id,
      amount: formatAmount,
      expected_on,
      status: status || "Em análise",
    });
  }
}

export type Input = {
  external_id: string;
  amount: string;
  expected_on?: string;
};
