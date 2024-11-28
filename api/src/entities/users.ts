import { Entity, Column, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  username!: string;

  @Column({
    length: 100,
  })
  email!: string;

  @Column({
    length: 100,
  })
  password!: string;
}
