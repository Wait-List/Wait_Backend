import { IsNotEmpty } from "class-validator";

export class SignUpRequest {
  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  password: string;
}
