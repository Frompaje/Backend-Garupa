import { pg } from "../../infra/database";
import { TransferInput } from "./types";

export class TransferRepository {
  async create({
    id,
    external_id,
    amount,
    expected_on,
    status,
  }: TransferInput) {
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

  async listTransfers(input: { page: number; search: string; take: number }) {
    const { page, search, take } = input;

    const offSet = (page - 1) * take;
    const query = `
    SELECT id, external_id, amount, expected_on, status, created_at, updated_at
    FROM TRANSFERS
    WHERE ($1 = '' OR external_id ILIKE '%' || $1 || '%')
    LIMIT $2 OFFSET $3
  `;

    const { rows } = await pg.query(query, [
      search.toLowerCase(),
      take,
      offSet,
    ]);

    return rows;
  }

  async countTransfers(input: { search: string }) {
    const { search } = input;

    const { rows } = await pg.query(
      "SELECT COUNT(*) FROM TRANSFERS WHERE ($1 = '' OR external_id ILIKE '%' || $1 || '%')",
      [search.toLowerCase()]
    );

    return rows.at(0).count;
  }
}
