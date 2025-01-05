import { HttpStatus } from "@nestjs/common";
import { WaitException } from "../wait-exception";

export class ListNotFoudException extends WaitException {
  constructor() {
    super("List Not Found", HttpStatus.NOT_FOUND);
  }
}
