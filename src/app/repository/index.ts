import { pg } from "../../infra/database";
import { TransferInput } from "./types";

export class TransferRepository {
  async create({ id, externalId, amount, expectedOn, status }: TransferInput) {
    await pg.query(
      "INSERT INTO TRANSFERS(id,external_id,amount,expected_on,status) VALUES ($1,$2,$3,$4,$5)",
      [id, externalId, amount, expectedOn, status]
    );
  }

  async getTransferById(id: string) {
    const { rows } = await pg.query(
      "SELECT id,external_id,amount,expected_on,status,created_at,updated_at FROM TRANSFERS WHERE id = $1",
      [id]
    );

    return rows[0];
  }

  async getTransferByExternalId(externalId: string) {
    const { rows } = await pg.query(
      "SELECT id,external_id,amount,expected_on,status,created_at,updated_at FROM TRANSFERS WHERE external_id = $1",
      [externalId]
    );

    return rows[0];
  }
}
