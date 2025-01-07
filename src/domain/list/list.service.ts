import { Injectable } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { CreateListRequest } from "./dto/request/createListRequest";
import { User } from "../user/user.entity";
import { UserMissMatchException } from "src/global/error/custom-exeption/user-miss-match-exception";
import { ListNotFoudException } from "src/global/error/custom-exeption/list-not-found-exception";

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async createList(request: CreateListRequest, user: User) {
    await this.listRepository.save(request, user);
  }

  async deleteList(id: number, user: User) {
    const list = await this.listRepository.findById(id);

    if (list == null) throw ListNotFoudException;

    if (list.user.accountId !== user.accountId) throw UserMissMatchException;

    await this.listRepository.delete(id);
  }
}
