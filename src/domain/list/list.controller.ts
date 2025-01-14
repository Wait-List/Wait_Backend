import {
  Body,
  Controller,
  Delete,
  Get,
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
    const createdList = await this.listService.createList(request, req.user);
    return createdList;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteList(@Query("id") id: number, @Req() req) {
    await this.listService.deleteList(id, req.user);
  }

  @Patch()
  async modifyList(
    @Query("id") id: number,
    @Body() request: ListRequest,
    @Req() req,
  ) {
    await this.listService.modifyList(id, request, req.user);
  }

  @Patch("/status")
  async changeStatus(@Query("id") id: number, @Req() req) {
    await this.listService.changeStatus(id, req.user);
  }

  @Get("/left")
  async leftList(@Req() req) {
    await this.listService.leftList(req.user);
  }

  @Get("/all")
  async allList(@Req() req) {
    await this.listService.allList(req.user);
  }
}
