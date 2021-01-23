import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "../../user";

@ObjectType({ isAbstract: true })
export abstract class BaseMaster extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 10, unique: true })
  code!: string;

  @Field()
  @Column({ type: "varchar", length: 50 })
  name!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  deprecated!: boolean;

  // DEFAULT COLUMNS

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  createdBy!: User;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  updatedBy!: User;

  @Field(() => String, { nullable: true })
  @DeleteDateColumn()
  deletedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  deletedBy!: User;
}
