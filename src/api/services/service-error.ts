export class ServiceError extends Error {
  constructor(message = "Unknown error.") {
    super(message);
  }
}