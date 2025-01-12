import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { List } from "./list.entity";
import { User } from "../user/user.entity";
import { ListRequest } from "../list/dto/request/listRequest";

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async save(list: List): Promise<List> {
    return await this.listRepository.save(list);
  }

  async findById(id: number): Promise<List | null> {
    return this.listRepository.findOne({
      where: { id },
    });
  }

  async findAllByUser(user: User): Promise<List[]> {
    return this.listRepository.find({
      where: { user },
      order: { date: "ASC" },
    });
  }

  async findAllByUserAndStatus(user: User, status: boolean): Promise<List[]> {
    return this.listRepository.find({
      where: {
        user,
        status,
      },
      order: { date: "ASC" },
    });
  }

  async delete(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }
}
