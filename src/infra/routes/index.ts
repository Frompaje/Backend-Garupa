import { Router } from "express";
import { errorHandler } from "../../middleware/error-handler";
import { TransferController } from "../controller";

export const router = Router();
const { createdTransfer, listTransferById } = new TransferController();

router.post("/transfers", createdTransfer);
router.get("/transfers/:id", listTransferById);

router.use(errorHandler);
