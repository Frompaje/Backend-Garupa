import { Router } from "express";
import { errorHandler } from "../../middleware/error-handler";
import { TransferController } from "../controller";

export const router = Router();
const { createdTransfer, getTransferById } = new TransferController();

router.post("/transfers", createdTransfer);
router.get("/transfers/:id", getTransferById);

router.use(errorHandler);
