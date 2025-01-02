import { TransferRepository } from "../repository";

export class ListTransferUseCase {
  constructor(private readonly repository: TransferRepository) {}

  async execute({ page, search, take }: Input) {
    const transfers = await this.repository.list({
      page,
      search,
      take,
    });

    const count = await this.repository.count({ search });

    return {
      data: transfers,
      meta: {
        page,
        take,
        total: Number(count),
      },
    };
  }
}

type Input = {
  page: number;
  search: string;
  take: number;
};
