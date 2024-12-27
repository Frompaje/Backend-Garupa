import { Request, Response } from "express";
import { transferSchema } from "./schema/transfer-schema";

export class TransferController {
  async createTransfers(req: Request, res: Response) {
    const { value, pixKey, date, dueDate } = transferSchema.parse(req.body);
  }
}
