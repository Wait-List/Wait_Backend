import { HttpStatus } from "@nestjs/common";
import { WaitException } from "../wait-exception";

export class UserMissMatchException extends WaitException {
  constructor() {
    super("User Miss Match", HttpStatus.UNAUTHORIZED);
  }
}
