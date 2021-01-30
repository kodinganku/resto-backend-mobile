import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { CustomerDiscount } from "./CustomerDiscount";
const status = { ACTIVE: 1, SUSPEND: 2 };
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cst_id: number;

  @Column({
    length: 45,
  })
  cst_name: string;

  @Column({
    type: "text",
  })
  cst_fcm_token: string;

  @Column({
    length: 45,
    nullable: true,
  })
  cst_phone: string;

  @Column({
    length: 45,
  })
  cst_email: string;

  @Column({
    type: "date",
    nullable: true,
  })
  cst_birthday: string;

  @Column({
    type: "tinyint",
    nullable: true,
  })
  cst_gender: number;

  @Column({
    nullable: true,
  })
  cst_address?: string;

  @Column({
    type: "tinyint",
  })
  cst_status: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  cst_created: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  cst_updated: Date;

  @Column({
    length: 45,
    select: false,
    nullable: true,
  })
  cst_username?: string;

  @Column({
    length: 45,
    select: false,
    nullable: true,
  })
  cst_password?: string;

  @OneToMany(
    type => CustomerDiscount,
    cust_dist => cust_dist.cds_customer
  )
  public cst_discount!: CustomerDiscount[];

  @BeforeInsert()
  setStatusToActive() {
    this.cst_status = status["ACTIVE"];
  }

  @BeforeUpdate()
  setUpdatedDate() {
    this.cst_updated = new Date();
  }
}
