import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { List } from "./list.entity";
import { UserModule } from "../user/user.module";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { ListRepository } from "./list.repository";

@Module({
  imports: [TypeOrmModule.forFeature([List]), UserModule],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
