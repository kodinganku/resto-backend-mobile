import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { MenuCategory } from "./MenuCategory";
import { MenuAdditional } from "./MenuAdditional";
const status = { DELETED: 0, PUBLISH: 1, DRAFT: 2 };

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  mnu_id: number;

  @Column({
    length: 45,
  })
  mnu_name: string;

  @Column({
    length: 100,
  })
  mnu_desc?: string;

  @ManyToOne(
    () => MenuCategory,
    menu_categ => menu_categ.mnc_menus
  )
  @JoinColumn({ name: "mnu_category" })
  mnu_category: MenuCategory;

  @ManyToMany(type => MenuAdditional)
  @JoinTable({
    name: "menu_additionalitem",
    joinColumn: {
      name: "mai_menu",
      referencedColumnName: "mnu_id",
    },
    inverseJoinColumn: {
      name: "mai_menuadditional",
      referencedColumnName: "mad_id",
    },
  })
  mnu_additionals: MenuAdditional[];

  @Column({
    type: "int",
  })
  mnu_price: number;

  @Column({ length: 100 })
  mnu_photo: string;

  @Column({ length: 45 })
  mnu_minorder: string;

  @Column({ type: "int", nullable: true })
  mnu_variant_parent?: number;

  @Column({
    type: "tinyint",
  })
  mnu_status: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  mnu_created: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  mnu_updated: Date;

  @BeforeInsert()
  setStatusToPublish() {
    this.mnu_status = status["PUBLISH"];
  }

  @BeforeUpdate()
  setUpdatedDate() {
    this.mnu_updated = new Date();
  }
}
