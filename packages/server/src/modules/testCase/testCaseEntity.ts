import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../user";
import { TestCaseHistory } from "./testCaseHistoryEntity";

@ObjectType()
@Entity()
export class TestCase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column("uuid")
  productId!: string;

  @Field()
  @Column("uuid")
  moduleId!: string;

  @Field()
  @Column("uuid")
  menuId!: string;

  @Field()
  @Column("uuid")
  testingForId!: string;

  @Field()
  @Column("uuid")
  testingScopeId!: string;

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
  passed?: boolean;

  @Field()
  @Column({ type: "text", nullable: true })
  actualResult?: string;

  @Field()
  @Column({ type: "text", nullable: true })
  userRemarks?: string;

  // DEFAULT COLUMNS

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.testCases)
  createdBy!: User;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.testCases, { nullable: true })
  updatedBy?: User;

  @AfterInsert()
  async insertIntoHistory(): Promise<void> {
    await TestCaseHistory.create({
      tsid: this.id,
      productId: this.productId,
      moduleId: this.moduleId,
      menuId: this.menuId,
      testingForId: this.testingForId,
      testingScopeId: this.testingScopeId,
      description: this.description,
      expectedResult: this.expectedResult,
      verified: this.verified,
      verifiedBy: this.verifiedBy,
      passed: this.passed,
      actualResult: this.actualResult,
      userRemarks: this.userRemarks,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
    }).save();
  }

  @AfterUpdate()
  async updateIntoHistory(): Promise<void> {
    await TestCaseHistory.create({
      tsid: this.id,
      productId: this.productId,
      moduleId: this.moduleId,
      menuId: this.menuId,
      testingForId: this.testingForId,
      testingScopeId: this.testingScopeId,
      description: this.description,
      expectedResult: this.expectedResult,
      verified: this.verified,
      verifiedBy: this.verifiedBy,
      passed: this.passed,
      actualResult: this.actualResult,
      userRemarks: this.userRemarks,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    }).save();
  }
}
