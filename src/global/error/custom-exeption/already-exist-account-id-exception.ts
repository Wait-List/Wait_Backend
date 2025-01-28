import { HttpStatus } from "@nestjs/common";
import { WaitException } from "../wait-exception";

export class AlreadyExistAccountIdException extends WaitException {
  constructor() {
    super("Already Exist AccountId", HttpStatus.NOT_FOUND);
  }
}
