const codes = require("./codes");

class RouteNotFoundError extends Error {
  constructor(message) {
    super(message || codes.ROUTE_NOT_FOUND);
    this.name = "RouteNotFoundError";
    this.status = 404;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message || codes.AUTHENTICATION_ERROR);
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message || codes.NOT_AUTHORIZED_ERROR);
    this.name = "NotAuthorizedError";
    this.status = 403;
  }
}

class RecordNotFoundError extends Error {
  constructor(message) {
    super(message || codes.RECORD_NOT_FOUND_ERROR);
    this.name = "RecordNotFoundError";
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message, fields) {
    super(message || codes.VALIDATION_ERROR);
    this.name = "ValidationError";
    this.status = 422;
    this.fields = fields || [];
  }
}

class RecordAlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.name = "RecordAlreadyExistError";
    this.status = 422;
  }
}

module.exports = {
  RouteNotFound: RouteNotFoundError,
  Authentication: AuthenticationError,
  NotAuthorized: NotAuthorizedError,
  RecordNotFound: RecordNotFoundError,
  Validation: ValidationError,
  RecordAlreadyExist: RecordAlreadyExistError,
};
