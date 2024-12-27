import { NextFunction, Request, Response } from "express";
import { transferSchema } from "./schema/transfer-schema";
import { CreatedTransferUseCase } from "../usecase/transfer-usecase";
import { TransferRepository } from "../repositories";

export class TransferController {
  async createTransfers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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
      next(error);
    }
  }
}
