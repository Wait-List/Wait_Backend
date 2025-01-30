import { IsNotEmpty } from "class-validator";

export class UserRequest {
  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  password: string;
}
