export class DueDateError extends Error {
  constructor() {
    super("[Expected Date Expired Error]: The expected date has expired");
  }
}
