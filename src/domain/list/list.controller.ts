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
import { ListRequest } from "./dto/request/list-request";
import { ListService } from "./list.service";

@Controller("list")
export class ListController {
  constructor(private readonly listService: ListService) {}

  // 리스트 생성
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createList(@Body() request: ListRequest, @Req() req) {
    const createdList = await this.listService.createList(request, req.user);
    return createdList;
  }

  // 리스트 삭제
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteList(@Query("id") id: number, @Req() req) {
    await this.listService.deleteList(id, req.user);
  }

  // 리스트 수정
  @Patch()
  async modifyList(
    @Query("id") id: number,
    @Body() request: ListRequest,
    @Req() req,
  ) {
    await this.listService.modifyList(id, request, req.user);
  }

  // 리스트 상태 변경
  @Patch("/status")
  async changeStatus(@Query("id") id: number, @Req() req) {
    await this.listService.changeStatus(id, req.user);
  }

  // 남은 리스트 조회
  @Get("/left")
  async leftList(@Req() req) {
    await this.listService.leftList(req.user);
  }

  // 리스트 전체 조회
  @Get("/all")
  async allList(@Req() req) {
    await this.listService.allList(req.user);
  }
}
