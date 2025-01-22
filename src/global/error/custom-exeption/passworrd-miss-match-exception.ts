import { HttpStatus } from "@nestjs/common";
import { WaitException } from "../wait-exception";

export class PasswordMissMatchException extends WaitException {
  constructor() {
    super("Password Miss Match", HttpStatus.UNAUTHORIZED);
  }
}
