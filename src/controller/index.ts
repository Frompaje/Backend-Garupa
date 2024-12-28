import { NextFunction, Request, Response } from "express";
import { CreatedTransferSchema } from "./schema/created-transfer-schema";
import { CreatedTransferUseCase } from "../usecase/created-transfer-usecase";
import { TransferRepository } from "../repositories";
import { ListTransferSchema } from "./schema/list-transfer-schema";
import { ListTransferUseCase } from "../usecase/list-transfer-usecase";

export class TransferController {
  async createdTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { externalId, amount, expectedOn, status } =
        CreatedTransferSchema.parse(req.body);

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

  async listTransferById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = ListTransferSchema.parse(req.params);
      
      const repository = new TransferRepository();
      const usecase = new ListTransferUseCase(repository);

      const transfer = await usecase.execute(id);

      res.status(200).send(transfer);
    } catch (error) {
      next(error);
    }
  }
}
