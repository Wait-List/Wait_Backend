import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { CreateListRequest } from "./dto/request/createListRequest";
import { ListService } from "./list.service";

@Controller("list")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createList(@Body() request: CreateListRequest, @Req() req) {
    const user = req.user;
    const createdList = await this.listService.createList(request, user);
    return createdList;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteList(@Query("id") id: number, @Req() req) {
    const user = req.user;
    await this.listService.deleteList(id, user);
  }
}
