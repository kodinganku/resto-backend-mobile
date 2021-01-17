import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { Menu } from "./Menu";
const status = { PUBLISH: 1, DRAFT: 2 };

@Entity()
export class MenuCategory {
  @PrimaryGeneratedColumn()
  mnc_id: number;

  @Column({
    length: 255,
  })
  mnc_name: string;

  @Column({
    type: "tinyint",
  })
  mnc_status: number;

  @OneToMany(
    () => Menu,
    menu => menu.mnu_category
  )
  mnc_menus: Menu[];

  @BeforeInsert()
  setStatusToPublish() {
    this.mnc_status = status["PUBLISH"];
  }
}
