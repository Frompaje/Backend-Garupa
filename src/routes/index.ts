import { Router } from "express";
import { TransferController } from "../controller";

export const router = Router();
const { createTransfers } = new TransferController();

router.post("/transfers", createTransfers);
