import { Router } from "express";
import { TransferController } from "../controller";

export const router = Router();
const controller = new TransferController() 
router.post("/transfers", controller.createTransfers);
