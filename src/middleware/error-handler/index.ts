import { DateExpiredError } from "../../shared/error/date-expired-error";
import { DuplicateExternalIdError } from "../../shared/error/duplicate-external-id-error";
import { InvalidTransferDataError } from "../../shared/error/invalid-transfer-data-error";
import type { ErrorRequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { TransferDoesNotExist } from "../../shared/error/transfer-does-not-exist-error";

export const errorHandler: ErrorRequestHandler = (
  error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof InvalidTransferDataError) {
    res.status(400).send({
      message: error.message,
    });
    return;
  }

  if (error instanceof DateExpiredError) {
    res.status(422).send({
      message: error.message,
    });
    return;
  }

  if (error instanceof DuplicateExternalIdError) {
    res.status(400).send({
      message: error.message,
    });
    return;
  }

  if (error instanceof TransferDoesNotExist) {
    res.status(404).send({
      message: error.message,
    });
    return;
  }

  res.status(500).send({
    message: "Internal server error",
  });
};
