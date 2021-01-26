import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../user";

@ObjectType()
@Entity()
export class TestCaseHistory extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  hid!: string;

  @Field()
  @Column("uuid")
  tsid!: string;

  @Field()
  @Column({ type: "varchar", length: 15 })
  productCode!: string;

  @Field()
  @Column({ type: "varchar", length: 20 })
  moduleCode!: string;

  @Field()
  @Column({ type: "varchar", length: 15 })
  menuCode!: string;

  @Field()
  @Column({ type: "varchar", length: 20 })
  testingFor!: string;

  @Field()
  @Column({ type: "varchar", length: 255 })
  testingScope!: string;

  @Field()
  @Column({ type: "text" })
  description!: string;

  @Field()
  @Column({ type: "text" })
  expectedResult!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  verified!: boolean;

  @Field(() => User)
  @ManyToOne(() => User)
  verifiedBy!: User;

  @Field()
  @Column({ type: "boolean", nullable: true })
  passed!: boolean;

  @Field()
  @Column({ type: "text", nullable: true })
  actualResult!: string;

  @Field()
  @Column({ type: "text", nullable: true })
  userRemarks!: string;

  @Field(() => String)
  @Column({ type: "timestamp without time zone", nullable: true })
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.testCases)
  createdBy!: User;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp without time zone", nullable: true })
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.testCases, { nullable: true })
  updatedBy!: User;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp without time zone", nullable: true })
  deletedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.testCases, { nullable: true })
  deletedBy!: User;
}
