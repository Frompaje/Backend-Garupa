import { Router } from "express";
import { TransferController } from "../controller";
import { errorHandle } from "../middleware/error-handle";

export const router = Router();
const { createdTransfer, listTransferById } = new TransferController();

router.post("/transfers", createdTransfer);
router.get("/transfers/:id", listTransferById);

router.use(errorHandle);
