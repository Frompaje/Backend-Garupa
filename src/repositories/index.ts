import { pg } from "../database";
import { v4 as uuid } from "uuid";
import { TransferInput } from "./types";
import { DuplicateExternalIdError } from "../shared/error/duplicate-external-id-error";

export class TransferRepository {
  async create({ externalId, amount, expectedOn, status }: TransferInput) {
    const id = uuid();
    const createdAt = new Date();

    try {
      await pg.query(
        "INSERT INTO TRANSFERS(id,external_id,amount,expected_on,status,created_at) VALUES ($1,$2,$3,$4,$5,$6)",
        [id, externalId, amount, expectedOn, status, createdAt]
      );
    } catch (error) {
      throw new DuplicateExternalIdError();
    }
  }

  async listAll(id: string) {
    const transfer = await pg.query("SELECT * FROM TRANSFERS WHERE id = $1", [
      id,
    ]);

    return { transfer };
  }
}
