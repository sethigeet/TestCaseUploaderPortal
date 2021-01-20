import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../user/userEntity";

@ObjectType()
@Entity()
export class TestCase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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

  @Field()
  @Column({ type: "boolean", default: false })
  passed!: boolean;

  @Field()
  @Column({ type: "text", nullable: true })
  actualResult!: string;

  @Field()
  @Column({ type: "text", nullable: true })
  userRemarks!: string;

  @Field()
  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.testCases)
  user!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
