import { NextFunction, Request, Response } from "express";
import { CreatedTransferSchema } from "./schema/created-transfer-schema";
import { GetTransferSchema } from "./schema/get-transfer-schema";
import { TransferRepository } from "../../app/repository";
import { CreatedTransferUseCase } from "../../app/usecase/created-transfer-usecase";
import { GetTransferUseCase } from "../../app/usecase/get-transfer-usecase";
import { logger } from "../../config/logger";
import { ListTransferSchema } from "./schema/list-transfers-schema";
import { ListTransferUseCase } from "../../app/usecase/list-transfers-usecase";

export class TransferController {
  async createdTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { external_id, amount, expected_on } = CreatedTransferSchema.parse(
        req.body
      );

      const repository = new TransferRepository();
      const usecase = new CreatedTransferUseCase(repository);

      await usecase.execute({
        external_id,
        amount,
        expected_on,
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
      const { id } = GetTransferSchema.parse(req.params);

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

  async listAllTransfers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, search, take } = ListTransferSchema.parse(req.query);

      const repository = new TransferRepository();
      const usecase = new ListTransferUseCase(repository);

      const output = await usecase.execute({
        page: page || 1,
        search: search || "",
        take: take || 10,
      });

      res.status(200).send(output);

      logger.info(`[GET] /transfer/list - 200 - List Transfer successfully`);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}
