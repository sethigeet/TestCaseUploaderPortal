import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  @Column({ type: "boolean", nullable: true })
  passed!: boolean;

  @Field()
  @Column({ type: "text", nullable: true })
  actualResult!: string;

  @Field()
  @Column({ type: "text", nullable: true })
  userRemarks!: string;

  // DEFAULT COLUMNS

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.testCases)
  createdBy!: User;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.testCases, { nullable: true })
  updatedBy!: User;

  @Field(() => String, { nullable: true })
  @DeleteDateColumn()
  deletedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.testCases, { nullable: true })
  deletedBy!: User;

  @AfterInsert()
  async insertIntoHistory(): Promise<void> {
    await TestCaseHistory.create({
      tsid: this.id,
      productCode: this.productCode,
      moduleCode: this.moduleCode,
      menuCode: this.menuCode,
      testingFor: this.testingFor,
      testingScope: this.testingScope,
      description: this.description,
      expectedResult: this.expectedResult,
      verified: this.verified,
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
      productCode: this.productCode,
      moduleCode: this.moduleCode,
      menuCode: this.menuCode,
      testingFor: this.testingFor,
      testingScope: this.testingScope,
      description: this.description,
      expectedResult: this.expectedResult,
      verified: this.verified,
      passed: this.passed,
      actualResult: this.actualResult,
      userRemarks: this.userRemarks,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    }).save();
  }

  @AfterRemove()
  async deleteIntoHistory(): Promise<void> {
    await TestCaseHistory.create({
      tsid: this.id,
      productCode: this.productCode,
      moduleCode: this.moduleCode,
      menuCode: this.menuCode,
      testingFor: this.testingFor,
      testingScope: this.testingScope,
      description: this.description,
      expectedResult: this.expectedResult,
      verified: this.verified,
      passed: this.passed,
      actualResult: this.actualResult,
      userRemarks: this.userRemarks,
      deletedAt: this.deletedAt,
      deletedBy: this.deletedBy,
    }).save();
  }
}
