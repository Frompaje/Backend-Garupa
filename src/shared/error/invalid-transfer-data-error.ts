export class InvalidTransferDataError extends Error{
  constructor() {
    super("[Os dados de transferência são inválidos]: external_id, amount, expected_on e status são obrigatórios.")
  }
}
