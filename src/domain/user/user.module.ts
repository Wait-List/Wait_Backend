import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.contorller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { TokenModule } from "src/global/jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
