import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
const bcrypt = require("bcrypt");

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
    unique: true,
  })
  username: string;

  @Column({
    length: 128,
    unique: true,
  })
  email: string;

  @Column({
    length: 128,
    select: false,
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  address?: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
