class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message = "internal server error", statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
