import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { TokenRespons } from "./dto/response/token-response";
import { UserRequest } from "./dto/request/user-request";
import { JwtAuthGuard } from "src/global/auth/auth.guarad";

@Controller("user")
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() request: UserRequest): Promise<TokenRespons> {
    return this.userService.signUp(request);
  }

  @Post("signin")
  async logIn(@Body() request: UserRequest): Promise<TokenRespons> {
    return this.userService.signIn(request);
  }
}
