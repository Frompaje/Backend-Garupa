import { mock } from "vitest-mock-extended";
import { expect, describe, it, beforeEach, vi } from "vitest";
import { TransferRepository } from "../../repository";
import { transferRepositoryMock } from "./mock/transfer-repository-mock";
import { ListTransferUseCase } from "../list-transfer-usecase";
import { TransferDoesNotExist } from "../../../shared/error/transfer-does-not-exist-error";

describe("[Usecase] List Transfer", () => {
  let usecase: ListTransferUseCase;

  let repository: TransferRepository;

  beforeEach(() => {
    repository = mock<TransferRepository>(transferRepositoryMock);
    usecase = new ListTransferUseCase(repository);
  });

  it("Should list a transfer", async () => {
    const data = {
      id: "ea97cce3-11c9-46f9-a5a9-cb5480cdf561",
      externalId: "123",
      amount: 12.3,
      expectedOn: "2024-12-27 23:38:58.639",
      status: "Completed",
      created_at: "2024-12-27 23:38:58.639",
      updated_at: null,
    };

    vi.spyOn(repository, "listTransferById").mockResolvedValueOnce(data);

    expect(
      await usecase.execute("ea97cce3-11c9-46f9-a5a9-cb5480cdf561")
    ).toEqual({
      transfer: data,
    });
  });

  it("Should show the error TransferDoesNotExist", async () => {
    vi.spyOn(repository, "listTransferById").mockRejectedValueOnce(new TransferDoesNotExist());

    expect(
      usecase.execute("ea97cce3-11c9-46f9-a5a9-cb5480cdf569")
    ).rejects.toBeInstanceOf(TransferDoesNotExist);
  });
});
