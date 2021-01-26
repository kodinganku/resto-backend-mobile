import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { OrderMenuAdditional } from "./order/";
const status = { PUBLISH: 1, DRAFT: 2 };

@Entity()
export class MenuAdditional {
  @PrimaryGeneratedColumn()
  mad_id: number;

  @Column({
    length: 255,
  })
  mad_name: string;

  @Column({
    type: "int",
  })
  mad_price: number;

  @Column({
    length: 255,
    nullable: true,
  })
  mad_photo: string;

  @Column({
    type: "tinyint",
  })
  mad_status: number;

  @OneToMany(
    () => OrderMenuAdditional,
    ord_menuadd => ord_menuadd.oma_menuadditional
  )
  mad_ordmenuadd!: OrderMenuAdditional[];

  @BeforeInsert()
  setStatusToPublish() {
    this.mad_status = status["PUBLISH"];
  }
}
