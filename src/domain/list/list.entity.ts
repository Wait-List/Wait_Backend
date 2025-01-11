import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity("tbl_list")
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false })
  status: Boolean = false;

  @ManyToOne(() => User, (user) => user.lists)
  user: User;
}
