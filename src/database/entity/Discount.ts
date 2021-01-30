import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { CustomerDiscount } from "./CustomerDiscount";
import { Order } from "./order";
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
    length: 255,
  })
  dsc_code: string;

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

  @OneToMany(
    type => CustomerDiscount,
    cust_dist => cust_dist.cds_discount
  )
  public dsc_customer!: CustomerDiscount[];

  @OneToMany(
    type => Order,
    order => order.ord_discount
  )
  dsc_orders!: Order[];

  @BeforeInsert()
  setStatusToPublish() {
    this.dsc_status = status["PUBLISH"];
  }
}
