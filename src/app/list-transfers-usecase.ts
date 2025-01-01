import { TransferRepository } from "./repository";

export class ListAllTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}

  async execute() {
    const transfer = await this.repository.listAllTransfers();

    return { transfer };
  }
}
