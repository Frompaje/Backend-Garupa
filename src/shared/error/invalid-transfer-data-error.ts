export class InvalidTransferDataError extends Error{
  constructor() {
    super("[Transfer data is invalid]: externalId, amount, expectedOn, and status are required.")
  }
}
