import { HttpException } from "@nestjs/common";

export class WaitException extends HttpException {
  constructor(message: string, status: number) {
    super({ message: [message] }, status);
  }
}
