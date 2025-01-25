import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JWTService } from "./jwt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("SECRET_KEY"),
        signOptions: { expiresIn: config.get<string>("ACCESS_EXP") },
      }),
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class TokenModule {}
