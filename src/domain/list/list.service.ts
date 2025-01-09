import { Injectable } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { ListRequest } from "./dto/request/listRequest";
import { User } from "../user/user.entity";
import { UserMissMatchException } from "src/global/error/custom-exeption/user-miss-match-exception";
import { ListNotFoudException } from "src/global/error/custom-exeption/list-not-found-exception";
import { List } from "./list.entity";

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async createList(request: ListRequest, user: User) {
    const list = Object.assign(new List(), {
      content: request.content,
      date: new Date(request.date),
      time: request.time,
      user,
    });
    await this.listRepository.save(list);
  }

  async deleteList(id: number, user: User) {
    const list = await this.listRepository.findById(id);

    if (list == null) throw ListNotFoudException;

    if (list.user.accountId !== user.accountId) throw UserMissMatchException;

    await this.listRepository.delete(id);
  }

  async modifyList(id: number, request: ListRequest, user: User) {
    const list = await this.listRepository.findById(id);

    if (list == null) throw ListNotFoudException;

    if (list.user.accountId !== user.accountId) throw UserMissMatchException;

    list.content = request.content;
    list.date = new Date(request.date);
    list.time = request.time;

    await this.listRepository.save(list);
  }
}
