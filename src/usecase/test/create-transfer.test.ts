import { mock } from "vitest-mock-extended";
import { expect, describe, it, beforeEach, vi } from "vitest";
import { CreatedTransferUseCase } from "../created-transfer-usecase";
import { TransferRepository } from "../../repository";
import { transferRepositoryMock } from "./mock/transfer-repository-mock";
import { InvalidTransferDataError } from "../../shared/error/invalid-transfer-data-error";
import { DateExpiredError } from "../../shared/error/date-expired-error";

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
        externalId: "123",
        amount: 12.3,
        expectedOn: "2024-12-27 23:38:58.639",
        status: "Completed",
      })
    ).resolves.not.toThrow();
  });

  it("Should show the error InvalidTransferDataError", async () => {
    await expect(
      usecase.execute({
        externalId: "",
        amount: 12.3,
        expectedOn: "2024-12-27 23:38:58.639",
        status: "Completed",
      })
    ).rejects.toBeInstanceOf(InvalidTransferDataError);
  });

  it("Should show the error DateExpiredError", async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);
 
    await expect(
      usecase.execute({
        externalId: "123",
        amount: 12.3,
        expectedOn: futureDate,
        status: "Completed",
      })
    ).rejects.toBeInstanceOf(DateExpiredError);
  });
});
