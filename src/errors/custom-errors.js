export class CustomError extends Error {
  constructor(message, code, status, data) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || "UNKNOWN_ERROR";
    this.status = status || 500;
    this.data = data || {};
    Error.captureStackTrace(this, this.constructor);
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl) {
    super(`Route '${originalUrl}' does not exist.`, "ROUTE_NOT_FOUND", 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityName) {
    super(`${entityName} not found.`, "ENTITY_NOT_FOUND", 404);
  }
}
export class BadUserInputError extends CustomError {
  constructor(errorData) {
    super("There were validation errors.", "BAD_USER_INPUT", 400, errorData);
  }
}

export class NotAuthenticatedError extends CustomError {
  constructor(errorData) {
    super("There were authentication errors.", "UNKNOWN_USER", 401, errorData);
  }
}
export class NotAuthorizedError extends CustomError {
  constructor(errorData) {
    super("There were authorization errors.", "USER_NOT_ALLOWED", 403, errorData);
  }
}

export class TooManyRequestsError extends CustomError {
  constructor() {
    super("Too many requests.", "TOO_MANY_REQUESTS", 429);
  }
}
