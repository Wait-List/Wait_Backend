import { Injectable, ConflictException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";
import { SignUpRequest } from "./dto/request/sign-up-request";
import { User } from "./user.entity";
import { TokenRespons } from "./dto/response/token-response";
import { JWTService } from "src/global/jwt/jwt.service";
import { AlreadyExistAccountIdException } from "src/global/error/custom-exeption/already-exist-account-id-exception";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JWTService,
  ) {}

  async signUp(request: SignUpRequest): Promise<TokenRespons> {
    if (await this.userRepository.findOneByAccountId(request.accountId))
      AlreadyExistAccountIdException;

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
}
