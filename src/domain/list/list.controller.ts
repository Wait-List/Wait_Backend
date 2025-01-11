import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { ListRequest } from "./dto/request/listRequest";
import { ListService } from "./list.service";

@Controller("list")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createList(@Body() request: ListRequest, @Req() req) {
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

  @Patch()
  async modifyList(
    @Query("id") id: number,
    @Body() request: ListRequest,
    @Req() req,
  ) {
    const user = req.user;
    await this.listService.modifyList(id, request, user);
  }

  @Patch("/status")
  async changeStatus(@Query("id") id: number, @Req() req) {
    const user = req.user;
  }
}
