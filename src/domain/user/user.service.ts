import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { TokenRespons } from "./dto/response/token-response";
import { JWTService } from "src/global/jwt/jwt.service";
import { AlreadyExistAccountIdException } from "src/global/error/custom-exeption/already-exist-account-id-exception";
import { UserRequest } from "./dto/request/user-request";
import { PasswordMissMatchException } from "src/global/error/custom-exeption/passworrd-miss-match-exception";
import { UserNotFoudException } from "src/global/error/custom-exeption/user-not-found-exception";
import { UserResponse } from "./dto/response/user-response";
import { PasswordRequest } from "./dto/request/password-request";
import { PasswordCannotBeSameException } from "src/global/error/custom-exeption/password-cannot-same-exception";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JWTService,
  ) {}

  async signUp(request: UserRequest): Promise<TokenRespons> {
    if (await this.userRepository.findOneByAccountId(request.accountId))
      throw new AlreadyExistAccountIdException();

    const { accountId, password } = request;

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const user = new User();
    user.accountId = accountId;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    const accessToken = await this.jwtService.generateAccessToken(accountId);
    const refreshToken = await this.jwtService.generateRefreshToken(accountId);

    return { accessToken, refreshToken };
  }

  async signIn(request: UserRequest): Promise<TokenRespons> {
    const { accountId, password } = request;

    const user = await this.userRepository.findOneByAccountId(accountId);

    if (!user) throw new UserNotFoudException();

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new PasswordMissMatchException();

    const accessToken = await this.jwtService.generateAccessToken(accountId);
    const refreshToken = await this.jwtService.generateRefreshToken(accountId);

    return { accessToken, refreshToken };
  }

  async my(user: User): Promise<UserResponse> {
    const response = new UserResponse();
    response.accountId = user.accountId;

    return response;
  }

  async password(request: PasswordRequest, user: User) {
    const nowUser = await this.userRepository.findOneByAccountId(
      user.accountId,
    );

    if (!nowUser) throw UserNotFoudException;

    const isCurrentPasswordValid = await bcrypt.compare(
      request.password,
      nowUser.password,
    );

    if (!isCurrentPasswordValid) throw new PasswordMissMatchException();

    if (request.password === request.newPassword)
      throw new PasswordCannotBeSameException();

    const newPW = await bcrypt.hash(request.newPassword, 10);

    nowUser.password = newPW;
    await this.userRepository.save(nowUser);
  }
}
