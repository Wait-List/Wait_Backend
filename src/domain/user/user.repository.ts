import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findOneByAccountId(accountId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { accountId } });
  }
}
