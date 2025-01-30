import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { TokenRespons } from "./dto/response/token-response";
import { UserRequest } from "./dto/request/user-request";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() request: UserRequest): Promise<TokenRespons> {
    return this.userService.signUp(request);
  }

  @Post("login")
  async logIn(@Body() request: UserRequest): Promise<TokenRespons> {
    return this.userService.signIn(request);
  }
}
