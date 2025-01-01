import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { List } from "../list/list.entity";

@Entity("tbl_user")
export class User {
  @PrimaryColumn()
  accountId: string;

  @Column()
  password: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];
}
