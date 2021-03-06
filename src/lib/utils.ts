require("dotenv").config();
export class GenericError extends Error {
  public httpCode: number = 500;
  public message: string = "Internal Server Error";

  constructor(httpCode: number, message?: string) {
    super();
    Object.setPrototypeOf(this, GenericError.prototype);
    if (httpCode) this.httpCode = httpCode;
    if (message) this.message = message;
    this.stack = null;
  }

  toJSON() {
    return {
      message: this.message,
      environtment: process.env.NODE_ENV,
      app_version: process.env.APP_VERSION || "none",
    };
  }
}
