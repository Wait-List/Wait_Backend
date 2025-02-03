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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ListRequest } from "./dto/request/list-request";
import { ListService } from "./list.service";
import { GetUser } from "src/global/auth/get-user.decorator";
import { User } from "../user/user.entity";
import { JwtAuthGuard } from "src/global/auth/auth.guarad";

@Controller("list")
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  // 리스트 생성
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createList(@Body() request: ListRequest, @GetUser() user: User) {
    await this.listService.createList(request, user);
  }

  // 리스트 삭제
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteList(@Query("id") id: number, @GetUser() user: User) {
    await this.listService.deleteList(id, user);
  }

  // 리스트 수정
  @Patch()
  async modifyList(
    @Query("id") id: number,
    @Body() request: ListRequest,
    @GetUser() user: User,
  ) {
    await this.listService.modifyList(id, request, user);
  }

  // 리스트 상태 변경
  @Patch("/status")
  async changeStatus(@Query("id") id: number, @GetUser() user: User) {
    await this.listService.changeStatus(id, user);
  }

  // 남은 리스트 조회
  @Get("/left")
  async leftList(@GetUser() user: User) {
    await this.listService.leftList(user);
  }

  // 리스트 전체 조회
  @Get("/all")
  async allList(@GetUser() user: User) {
    await this.listService.allList(user);
  }
}
