import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { TokenModule } from "src/global/jwt/jwt.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [TypeOrmModule.forFeature([User]), UserRepository],
})
export class UserModule {}
