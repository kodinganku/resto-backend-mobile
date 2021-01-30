import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
const status = { DELETED: 0, PUBLISH: 1, DRAFT: 2 };

@Entity()
export class PaymentGateway {
  @PrimaryGeneratedColumn()
  public pyg_id!: number;

  @Column()
  pyg_name: string;

  @Column()
  pyg_detail: string;

  @Column({
    type: "tinyint",
  })
  pyg_type: number;

  @Column({
    type: "tinyint",
  })
  pyg_status: number;
}
