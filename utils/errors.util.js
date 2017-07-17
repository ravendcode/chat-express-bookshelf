import config from '../config';

export class NotFoundError extends Error {
  constructor(message) {
    super();
    this.error = true;
    this.status = 404;
    this.name = 'NotFoundError';
    this.message = message;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super();
    this.error = true;
    this.status = 400;
    this.name = 'BadRequestError';
    this.message = message;
  }
}

export class BadTokenError extends Error {
  constructor(message) {
    super();
    this.error = true;
    this.status = 401;
    this.name = 'BadTokenError';
    this.message = message;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.error = true;
    this.status = 401;
    this.name = 'UnauthorizedError';
    this.message = message;
  }
}

export class ValidationError extends Error {
  constructor(errors) {
    super();
    this.error = true;
    this.status = 400;
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class LoginError extends Error {
  constructor(message) {
    super();
    this.error = true;
    this.status = 400;
    this.name = 'LoginError';
    this.message = message;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super();
    this.error = true;
    this.status = 500;
    this.name = 'InternalServerError';
    this.message = message;
  }

  toJSON() {
    let result = {
      error: this.error,
      name: this.name,
      status: this.status,
      message: this.message,
    };
    if (config.env === 'development') {
      result['stack'] = this.stack;
    }
    return result;
  }
}
