import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Discount, Customer } from "../";
import { Tax } from "./Tax";
const status = { NOT_PAID: 0, HALF_PAID: 1, PAID: 2, CANCELED: 3, REFUND: 4 };
const is_deliv = { DELIVERY: 1, TAKEAWAY: 2 };

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public ord_id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  ord_code: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  ord_fordate: Date;

  @Column({
    type: "timestamp",
  })
  ord_date: Date;

  @Column({
    type: "tinyint",
  })
  ord_isdelivery: number;

  @Column()
  ord_delivaddress: string;

  @Column()
  ord_delivcity: string;

  @Column()
  ord_delivprovince: string;

  @Column()
  ord_delivzip: number;

  @Column()
  ord_subtotal: number;

  @Column()
  ord_total: number;

  @Column({
    type: "tinyint",
  })
  ord_type: number;

  @Column({
    type: "tinyint",
  })
  ord_status: number;

  @ManyToOne(
    () => Discount,
    discount => discount.dsc_orders
  )
  @JoinColumn({ name: "ord_discount" })
  ord_discount!: Discount;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "ord_customer" })
  ord_customer!: Customer;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  ord_created: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  ord_updated: Date;

  @ManyToMany(type => Tax)
  @JoinTable({
    name: "order_tax",
    joinColumn: {
      name: "ort_order",
      referencedColumnName: "ord_id",
    },
    inverseJoinColumn: {
      name: "ort_tax",
      referencedColumnName: "tax_id",
    },
  })
  ord_taxes: Tax[];

  @BeforeInsert()
  setStatusToActive() {
    this.ord_status = status["NOT_PAID"];
  }

  @BeforeUpdate()
  setUpdatedDate() {
    this.ord_updated = new Date();
  }
}
