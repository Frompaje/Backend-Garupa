import { pg } from "../database";
import { Input } from "../type/input-transfer";

export class TransferRepository {
  async create({ date, pixKey, value, dueDate }: Input) {
    await pg.query
  };
}
