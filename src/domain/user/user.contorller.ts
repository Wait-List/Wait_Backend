import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignUpRequest } from "./dto/request/sign-up-request";
import { TokenRespons } from "./dto/response/token-response";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("signUp")
  async signUp(@Body() request: SignUpRequest): Promise<TokenRespons> {
    return this.userService.signUp(request);
  }
}
