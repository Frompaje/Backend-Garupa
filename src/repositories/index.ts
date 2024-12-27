import { Input } from "../type/input-transfer";

export class TransferRepository {
  create({ date, pixKey, value, dueDate }: Input);
}
