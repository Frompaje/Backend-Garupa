import { pg } from "../database";
import { v4 as uuid } from "uuid";
import { TransferInput } from "./types";
import { DuplicateExternalIdError } from "../shared/error/duplicate-external-id-error";

export class TransferRepository {
  async create({ externalId, amount, expectedOn, status }: TransferInput) {
    const id = uuid();

    try {
      await pg.query(
        "INSERT INTO TRANSFERS(id,external_id,amount,expected_on,status) VALUES ($1,$2,$3,$4,$5)",
        [id, externalId, amount, expectedOn, status]
      );
    } catch (error) {
      throw new DuplicateExternalIdError();
    }
  }

  async listTransferById(id: string) {
    const { rows } = await pg.query("SELECT * FROM TRANSFERS WHERE id = $1", [
      id,
    ]);
   
    return rows
  }
}
