import { pg } from "../database";
import { v4 as uuid } from "uuid";
import { TransferInput } from "./types";

export class TransferRepository {
  async create({
    externalId,
    amount,
    expectedOn,
    status,
  }: TransferInput) {

    const id = uuid();
    const createdAt = new Date()

    try {
      await pg.query(
        "INSERT INTO TRANSFERS(id,externalId,amount,expectedOn,status,createdAt) VALUES ($1,$2,$3,$4,$5,$6)",
        [id, externalId, amount, expectedOn, status, createdAt]
      );
    } catch (err) {
      console.log(err)
    }
   
  }

  async listAll(id: string) {
    const transfer = await pg.query("SELECT * FROM TRANSFERS WHERE id = $1", [
      id,
    ]);

    return { transfer };
  }
}
