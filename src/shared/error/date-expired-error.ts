export class DateExpiredError extends Error {
  constructor() {
    super("[Expected Date Expired Error]: The expected date has expired");
  }
}
