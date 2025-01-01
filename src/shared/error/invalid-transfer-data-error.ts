export class InvalidTransferDataError extends Error{
  constructor() {
    super("[Os dados de transferência são inválidos]: external_id e amount são obrigatórios.")
  }
}
