import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { List } from "./list.entity";
import { User } from "../user/user.entity";
import { CreateListRequest } from "./dto/request/createListRequest";

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async createList(request: CreateListRequest, user: User): Promise<List> {
    const list = new List();
    list.content = request.content;
    list.date = new Date(request.date);
    list.time = request.time;
    list.user = user;

    return await this.listRepository.save(list);
  }
}
