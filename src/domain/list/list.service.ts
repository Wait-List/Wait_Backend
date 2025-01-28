import { Injectable } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { ListRequest } from "./dto/request/list-request";
import { User } from "../user/user.entity";
import { List } from "./list.entity";
import { UserMissMatchException } from "src/global/error/custom-exeption/user-miss-match-exception";
import { ListNotFoudException } from "src/global/error/custom-exeption/list-not-found-exception";

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
    const list = await this.listExist(id);
    await this.checkUser(list, user);
    await this.listRepository.delete(id);
  }

  async modifyList(id: number, request: ListRequest, user: User) {
    const list = await this.listExist(id);
    await this.checkUser(list, user);

    list.content = request.content;
    list.date = new Date(request.date);
    list.time = request.time;

    await this.listRepository.save(list);
  }

  async changeStatus(id: number, user: User) {
    const list = await this.listExist(id);
    await this.checkUser(list, user);

    list.status = !list.status;

    await this.listRepository.save;
  }

  async leftList(user: User) {
    const list = this.listRepository.findAllByUserAndStatus(user, false);

    return list;
  }

  async allList(user: User) {
    const list = this.listRepository.findAllByUser(user);
    return list;
  }

  async checkUser(list: List, user: User): Promise<void> {
    if (list.user.accountId !== user.accountId) throw UserMissMatchException;
  }

  async listExist(id: number): Promise<List> {
    const list = await this.listRepository.findById(id);

    if (list == null) throw ListNotFoudException;
    return list;
  }
}
