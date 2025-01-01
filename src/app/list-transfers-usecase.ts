import { TransferRepository } from "./repository";

export class ListAllTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}

  async execute() {
    const transfers = await this.repository.listAllTransfers();
    return { transfers };
  }
}
