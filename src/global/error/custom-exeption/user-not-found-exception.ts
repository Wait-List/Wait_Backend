import { HttpStatus } from "@nestjs/common";
import { WaitException } from "../wait-exception";

export class UserNotFoudException extends WaitException {
  constructor() {
    super("User Not Found", HttpStatus.NOT_FOUND);
  }
}
