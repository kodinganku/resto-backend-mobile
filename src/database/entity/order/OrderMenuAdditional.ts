import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderMenu } from "./OrderMenu";
import { MenuAdditional } from "../MenuAdditional";

@Entity()
export class OrderMenuAdditional {
  @PrimaryGeneratedColumn()
  public oma_id!: number;

  @ManyToOne(
    () => OrderMenu,
    orderMenu => orderMenu.odm_additionals
  )
  @JoinColumn({ name: "oma_ordermenu" })
  oma_ordermenu!: OrderMenu;

  @ManyToOne(
    () => MenuAdditional,
    menu_add => menu_add.mad_ordmenuadd
  )
  @JoinColumn({ name: "oma_menuadditional" })
  oma_menuadditional!: MenuAdditional;

  @Column()
  oma_quantity: number;

  @Column()
  oma_price: number;

  @Column()
  oma_total: number;
}
