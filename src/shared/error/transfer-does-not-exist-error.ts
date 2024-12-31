export class TransferDoesNotExist extends Error {
  constructor() {
    super("A transferência não existe");
  }
}
