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

  @Column({ name: "date_time", nullable: false, type: "timestamp" })
  dateTime: Date;

  @Column({ nullable: false, default: false })
  status: boolean;

  @ManyToOne(() => User, (user) => user.lists)
  @JoinColumn({ name: "user_id" })
  user: User;
}
