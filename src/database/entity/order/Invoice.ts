import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tax } from ".";
import { Order } from ".";
import { Customer } from "../";
import { PaymentGateway } from "./PaymentGateway";
const status = { NOT_PAID: 0, PAID: 1, CANCELED: 2 };

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  public inv_id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  inv_code: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "inv_order" })
  inv_order!: Order;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "inv_customer" })
  inv_customer!: Customer;

  @ManyToOne(() => PaymentGateway)
  @JoinColumn({ name: "inv_paygateway" })
  inv_paygateway!: PaymentGateway;

  @Column({
    type: "timestamp",
  })
  inv_date: number;

  @Column({
    type: "timestamp",
  })
  inv_duedate: number;

  @Column({
    type: "tinyint",
  })
  inv_isdp: number;

  @Column({
    nullable: true,
  })
  inv_dp: string; //value of dp, 10 or another

  @Column({
    nullable: true,
  })
  inv_dpvalue: number;

  @Column()
  inv_total: number;

  @Column({
    type: "tinyint",
  })
  inv_status: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  inv_created: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  inv_updated: Date;

  @BeforeInsert()
  setStatusToActive() {
    this.inv_status = status["NOT_PAID"];
  }

  @BeforeUpdate()
  setUpdatedDate() {
    this.inv_updated = new Date();
  }
}
