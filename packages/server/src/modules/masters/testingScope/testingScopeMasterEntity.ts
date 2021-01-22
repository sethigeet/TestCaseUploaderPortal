import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../../user";

import { TestingForMaster } from "../testingFor";

@ObjectType()
@Entity()
export class TestingScopeMaster extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "varchar", length: 10, unique: true })
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  name!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  deprecated!: boolean;

  @Field(() => TestingForMaster)
  @ManyToOne(() => TestingForMaster, (testingFor) => testingFor.tesingScopes)
  testingFor!: TestingForMaster;

  // DEFAULT COLUMNS

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  createdBy!: User;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  updatedBy!: User;
}
