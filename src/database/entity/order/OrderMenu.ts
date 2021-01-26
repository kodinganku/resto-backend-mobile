import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "../Menu";
import { OrderMenuAdditional } from "./OrderMenuAdditional";

@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  public odm_id!: number;

  @ManyToOne(
    () => Menu,
    menu => menu.mnu_orders
  )
  @JoinColumn({ name: "odm_menu" })
  odm_menu!: Menu;

  @OneToMany(
    () => OrderMenuAdditional,
    ord_menuadd => ord_menuadd.oma_ordermenu
  )
  odm_additionals!: OrderMenuAdditional[];

  @Column()
  odm_quantity: number;

  @Column()
  odm_price: number;

  @Column()
  odm_total: number;

  @Column({
    type: "text",
  })
  odm_note: string;
}
