import { mock } from "vitest-mock-extended";
import { expect, describe, it, beforeEach, vi } from "vitest";
import { CreatedTransferUseCase } from "../created-transfer-usecase";
import { TransferRepository } from "../../repository";
import { transferRepositoryMock } from "./mock/transfer-repository-mock";
import { DueDateError } from "../../../shared/error/due-date-error";
import { InvalidTransferDataError } from "../../../shared/error/invalid-transfer-data-error";

describe("[Usecase] Created Transfer", () => {
  let usecase: CreatedTransferUseCase;

  let repository: TransferRepository;

  beforeEach(() => {
    repository = mock<TransferRepository>(transferRepositoryMock);
    usecase = new CreatedTransferUseCase(repository);
  });

  it("Should created a transfer", async () => {
    await expect(
      usecase.execute({
        external_id: "123",
        amount: "12.3",
        expected_on: "2024-12-27 23:38:58.639",
      })
    ).resolves.not.toThrow();
  });

  it("Should show the error InvalidTransferDataError", async () => {
    await expect(
      usecase.execute({
        external_id: "",
        amount: "12.3",
        expected_on: "2024-12-27 23:38:58.639",
      })
    ).rejects.toBeInstanceOf(InvalidTransferDataError);
  });
});
