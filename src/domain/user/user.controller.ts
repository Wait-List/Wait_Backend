import {
  Body,
  Controller,
  Get,
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
import { UserResponse } from "./dto/response/user-response";
import { GetUser } from "src/global/auth/get-user.decorator";
import { User } from "./user.entity";

@Controller("user")
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() request: UserRequest): Promise<TokenRespons> {
    return this.userService.signUp(request);
  }

  // 로그인
  @Post("signin")
  async logIn(@Body() request: UserRequest): Promise<TokenRespons> {
    return this.userService.signIn(request);
  }

  // 유저정보 반환
  @UseGuards(JwtAuthGuard)
  @Get("my")
  async my(@GetUser() user: User): Promise<UserResponse> {
    return this.userService.my(user);
  }
}
