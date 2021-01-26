import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";

const status = { WAITING: 0, ACCEPTED: 1, REJECTED: 2 };

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public trs_id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  trs_code: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  trs_date: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  trs_invoicecode: string;

  @Column()
  trs_paygateway: string;

  @Column()
  trs_total: number;

  @Column()
  trs_name: string;

  @Column()
  trs_email: string;

  @Column()
  trs_note: string;

  @Column()
  trs_photo: string;

  @Column({
    type: "tinyint",
  })
  trs_status: number;

  @BeforeInsert()
  setStatusToActive() {
    this.trs_status = status["WAITING"];
  }
}
