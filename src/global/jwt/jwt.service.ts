import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(accountId: string): Promise<string> {
    const payload = { accountId };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(accountId: string): Promise<string> {
    const payload = { accountId };
    const option: JwtSignOptions = {
      secret: this.configService.get<string>("JWT_RE_SECRET"),
      expiresIn: this.configService.get<string>("JWT_RE_EXE"),
    };

    return this.jwtService.sign(payload, option);
  }
}
