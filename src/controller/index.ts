import { Request, Response } from "express";
import { transferSchema } from "./schema/transfer-schema";
import { CreatedTransferUseCase } from "../usecase/transfer-usecase";
import { TransferRepository } from "../repositories";
import { InvalidTransferDataError } from "../shared/error/invalid-transfer-data-error";
import { DateExpiredError } from "../shared/error/date-expired-error";
import { DuplicateExternalIdError } from "../shared/error/duplicate-external-id-error";

export class TransferController {
  async createTransfers(req: Request, res: Response): Promise<any> {
    try {
      const { externalId, amount, expectedOn, status } = transferSchema.parse(
        req.body
      );  

      const repository = new TransferRepository();
      const usecase = new CreatedTransferUseCase(repository);
 
      await usecase.execute({
        externalId,
        amount,
        expectedOn,
        status,
      });

      res.status(201).send("Transfer created successfully");
    } catch (error) {
      if (error instanceof InvalidTransferDataError) {
        return res.status(400).send({
          message: error.message,
        });
      }

      if (error instanceof DateExpiredError) {
        return res.status(422).send({
          message: error.message,
        });
      }

      if (error instanceof DuplicateExternalIdError) {
        return res.status(400).send({
          message: error.message,
        });
      }

      res.status(500).send({
        message: "Internal server error",
      });
    }
  }
}
