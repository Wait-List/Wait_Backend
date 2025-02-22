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
    const doneDate = new Date(`${request.date}T${request.time}:00`);

    const list = Object.assign(new List(), {
      content: request.content,
      dateTime: doneDate,
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

    const doneDate = new Date(`${request.date}T${request.time}:00`);

    list.content = request.content;
    list.dateTime = doneDate;

    await this.listRepository.save(list);
  }

  async changeStatus(id: number, user: User) {
    const list = await this.listExist(id);
    await this.checkUser(list, user);

    list.status = !list.status;

    await this.listRepository.save;
  }

  async leftList(user: User) {
    const date = new Date();
    const list = await this.listRepository.findAllByUserAndStatusAndDateTime(
      user,
      false,
      date,
    );

    return list;
  }

  async allList(user: User) {
    const list = await this.listRepository.findAllByUser(user);
    return list;
  }

  async checkUser(list: List, user: User) {
    if (list.user.accountId !== user.accountId)
      throw new UserMissMatchException();
  }

  async listExist(id: number) {
    const list = await this.listRepository.findById(id);

    if (list == null) throw new ListNotFoudException();
    return list;
  }
}
