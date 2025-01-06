import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity';
import { User } from '../user/user.entity';
import { CreateListRequest } from './dto/request/createListRequest';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async save(request: CreateListRequest, user: User): Promise<List> {
    const list = Object.assign(new List(), {
        content: request.content,
        date: new Date(request.date),
        time: request.time,
        user,
      });
    return await this.listRepository.save(list);
  }

  async findById(id: number): Promise<List | null> {
    return this.listRepository.findOne({
      where: { id },
    });
  }

  async delete(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }
  
}
