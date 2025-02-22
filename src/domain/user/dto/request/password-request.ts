import { IsNotEmpty } from "class-validator";

export class PasswordRequest {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}
