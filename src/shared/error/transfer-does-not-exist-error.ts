export class TransferDoesNotExist extends Error {
  constructor() {
    super("Transfer doesn't exist");
  }
}
