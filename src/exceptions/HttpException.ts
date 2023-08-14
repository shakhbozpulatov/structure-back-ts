export class HttpException extends Error {
  public status: number;
  public message: string;
  public hasJSON: boolean;

  constructor(status: number, message: string, hasJSON: boolean = false) {
    super(message);

    this.status = status;
    this.message = message;
    this.hasJSON = hasJSON;
  }
}
