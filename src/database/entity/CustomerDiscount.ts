import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from "typeorm";
import { Discount } from "./Discount";
import { Customer } from "./Customer";

@Entity()
export class CustomerDiscount {
  @PrimaryGeneratedColumn()
  public cds_id!: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  cds_used: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  cds_claimed: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  cds_created: number;

  @ManyToOne(
    () => Discount,
    discount => discount.dsc_customer
  )
  @JoinColumn({ name: "cds_discount" })
  public cds_discount!: Discount;

  @ManyToOne(
    () => Customer,
    customer => customer.cst_discount
  )
  @JoinColumn({ name: "cds_customer" })
  public cds_customer!: Customer;
}
