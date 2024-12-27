import { pg } from "../database";
import { TransferInput } from "./types";

export class TransferRepository {
  async create({
    id,
    externalId,
    amount,
    expectedOn,
    status,
    createdAt,
    updatedAt,
  }: TransferInput) {
    await pg.query(
      "INSERT INTO TRANSFER(id,date,pix_key,value,due_date,created_at) VALUES ($1,$2,$3,$4,$5,$6)",
      [id, externalId, amount, expectedOn, status, createdAt, updatedAt]
    );
  }
}
