import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload): Promise<any> {
    const { accountId } = payload;

    const user = await this.userRepository.findOneByAccountId(accountId);
    if (!user) {
      throw new UnauthorizedException("Invalid token or user");
    }

    return user;
  }
}
