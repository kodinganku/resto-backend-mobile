import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
const status = { DELETED: 0, PUBLISH: 1, DRAFT: 2 };

@Entity()
export class Tax {
  @PrimaryGeneratedColumn()
  public tax_id!: number;

  @Column()
  tax_name: string;

  @Column()
  tax_description: string;

  @Column()
  tax_value: number;

  @Column({
    type: "tinyint",
  })
  tax_unit: number;

  @Column({
    type: "tinyint",
  })
  tax_status: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  tax_created: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  tax_updated: Date;

  @BeforeUpdate()
  setUpdatedDate() {
    this.tax_updated = new Date();
  }
}
