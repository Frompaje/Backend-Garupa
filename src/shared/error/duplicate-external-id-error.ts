export class DuplicateExternalIdError extends Error {
  constructor() {
    super("[ID Externo Duplicado]: O ID Externo já existe");
  }
}
