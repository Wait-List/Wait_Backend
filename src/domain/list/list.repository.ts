import { Injectable } from "@nestjs/common";
import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { List } from "./list.entity";
import { User } from "../user/user.entity";

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
      order: { dateTime: "DESC" },
    });
  }

  async findAllByUserAndStatusAndDateTime(
    user: User,
    status: boolean,
    dateTime: Date,
  ): Promise<List[]> {
    return this.listRepository.find({
      where: {
        user,
        status,
        dateTime: MoreThan(dateTime),
      },
      order: { dateTime: "ASC" },
    });
  }

  async delete(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }
}
