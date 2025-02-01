import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("tbl_list")
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, type: "timestamp" })
  date: Date;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false, default: false })
  status: boolean;

  @ManyToOne(() => User, (user) => user.lists)
  @JoinColumn({ name: "user_id", referencedColumnName: "accountId" })
  user: User;
}
