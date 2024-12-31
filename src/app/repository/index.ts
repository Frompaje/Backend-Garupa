import { pg } from "../../infra/database";
import { TransferInput } from "./types";

export class TransferRepository {
  async create({ id, external_id, amount, expected_on, status }: TransferInput) {
    await pg.query(
      "INSERT INTO TRANSFERS(id,external_id,amount,expected_on,status) VALUES ($1,$2,$3,$4,$5)",
      [id, external_id, amount, expected_on, status]
    );
  }

  async getTransferById(id: string) {
    const { rows } = await pg.query(
      "SELECT id,external_id,amount,expected_on,status,created_at,updated_at FROM TRANSFERS WHERE id = $1",
      [id]
    );

    return rows[0];
  }

  async getTransferByExternalId(external_id: string) {
    const { rows } = await pg.query(
      "SELECT id,external_id,amount,expected_on,status,created_at,updated_at FROM TRANSFERS WHERE external_id = $1",
      [external_id]
    );

    return rows[0];
  }
}
