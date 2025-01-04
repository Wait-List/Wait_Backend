import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from "@nestjs/common";
import { CreateListRequest } from "./dto/request/createListRequest";
import { ListService } from "./list.service";
import { User } from "../user/user.entity";

@Controller("list")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createList(@Body() request: CreateListRequest, @Req() req) {
    const user: User = req.user;
    const createdList = await this.listService.createList(request, user);
    return createdList;
  }
}
