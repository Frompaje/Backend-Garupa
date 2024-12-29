import { Router } from "express";
import { TransferController } from "../controller";
import { errorHandler } from "../middleware/error-handler";

export const router = Router();
const { createdTransfer, listTransferById } = new TransferController();

router.post("/transfers", createdTransfer);
router.get("/transfers/:id", listTransferById);

router.use(errorHandler);
