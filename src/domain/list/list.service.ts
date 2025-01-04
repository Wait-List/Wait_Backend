import { Injectable } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { CreateListRequest } from "./dto/request/createListRequest";
import { User } from "../user/user.entity";

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async createList(request: CreateListRequest, user: User) {
    await this.listRepository.createList(request, user);
  }
}
