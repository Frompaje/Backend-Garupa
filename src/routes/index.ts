import { Router } from "express";
import { TransferController } from "../controller";
import { errorHandle } from "../middleware/error-handle";

export const router = Router();
const { createTransfers } = new TransferController();

router.post("/transfers", createTransfers);

router.use(errorHandle);
