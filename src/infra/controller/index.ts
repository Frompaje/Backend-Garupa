import { NextFunction, Request, Response } from "express";
import { CreatedTransferSchema } from "./schema/created-transfer-schema";
import { ListTransferSchema } from "./schema/list-transfer-schema";
import { TransferRepository } from "../../app/repository";
import { CreatedTransferUseCase } from "../../app/usecase/created-transfer-usecase";
import { GetTransferUseCase } from "../../app/usecase/get-transfer-usecase";
import { logger } from "../../config/logger";

export class TransferController {
  async createdTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { external_id, amount, expected_on, status } =
        CreatedTransferSchema.parse(req.body);

      const repository = new TransferRepository();
      const usecase = new CreatedTransferUseCase(repository);

      await usecase.execute({
        external_id,
        amount,
        expected_on,
        status,
      });

      res.status(201).send("Transfer created successfully");
      logger.info("[POST] /transfer - 201 - Transfer created successfully");
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  async getTransferById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = ListTransferSchema.parse(req.params);

      const repository = new TransferRepository();
      const usecase = new GetTransferUseCase(repository);

      const transfer = await usecase.execute(id);

      res.status(200).send(transfer);
      logger.info(
        `[GET] /transfer/${id} - 200 - Transfer retrieved successfully`
      );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}
