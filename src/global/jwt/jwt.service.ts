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
      secret: this.configService.get<string>("SECRET_KEY"),
      expiresIn: this.configService.get<string>("REFRESH_EXP"),
    };

    return this.jwtService.sign(payload, option);
  }

  async validateAccessToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
