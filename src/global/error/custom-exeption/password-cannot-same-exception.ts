import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { WaitException } from "../wait-exception";

export class PasswordCannotBeSameException extends WaitException {
  constructor() {
    super("Password Cannot Be Same", HttpStatus.UNAUTHORIZED);
  }
}
