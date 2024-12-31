export class DueDateError extends Error {
  constructor() {
    super("[Data Esperada Expirada]: A data esperada expirou");
  }
}
