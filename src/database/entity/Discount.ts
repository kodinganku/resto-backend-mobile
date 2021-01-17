import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
const status = { PUBLISH: 1, DRAFT: 2 };

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  dsc_id: number;

  @Column({
    length: 255,
  })
  dsc_name: string;

  @Column({
    type: "int",
  })
  dsc_value: number;

  @Column({
    type: "tinyint",
  })
  dsc_unit: number;

  @Column({
    type: "timestamp",
  })
  dsc_expired: Date;

  @Column({
    type: "tinyint",
  })
  dsc_status: number;

  @BeforeInsert()
  setStatusToPublish() {
    this.dsc_status = status["PUBLISH"];
  }
}
