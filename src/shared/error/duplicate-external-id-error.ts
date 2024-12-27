export class DuplicateExternalIdError extends Error {
  constructor() {
    super("[Duplicate ExternalId Error]: External ID already exists");
  }
}
