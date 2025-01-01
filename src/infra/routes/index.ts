import { Router } from "express";
import { errorHandler } from "../../middleware/error-handler";
import { TransferController } from "../controller";

export const router = Router();
const { createdTransfer, getTransferById, listAllTransfers } =
  new TransferController();

router.post("/transfers", createdTransfer);
router.get("/transfers/search/:id", getTransferById);
router.get("/transfers/list", listAllTransfers);

router.use(errorHandler);
