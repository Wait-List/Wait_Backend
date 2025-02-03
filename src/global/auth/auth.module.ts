import { Module } from "@nestjs/common";
import { UserModule } from "src/domain/user/user.module";
import { JwtStrategy } from "./auth.strategy";
import { JwtAuthGuard } from "./auth.guarad";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), UserModule],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, PassportModule],
})
export class AuthModule {}
