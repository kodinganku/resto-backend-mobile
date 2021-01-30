import { Entity, Column, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from ".";

@Entity()
export class OrderReservation {
  @PrimaryGeneratedColumn()
  public odr_id!: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: "odr_order" })
  odr_order!: Order;

  @Column()
  odr_table: number;

  @Column()
  odr_people: number;

  @Column({
    type: "timestamp",
  })
  odr_start: Date;

  @Column({
    type: "timestamp",
  })
  odr_end: Date;

  @Column({
    type: "tinyint",
  })
  odr_status: number;
}
