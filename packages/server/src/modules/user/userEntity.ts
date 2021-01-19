import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { hash } from "argon2";

import { UserRoles } from "@portal/common";
import { TestCase } from "../testCase/testCaseEntity";

registerEnumType(UserRoles, { name: "UserRoles" });

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "enum", enum: UserRoles, default: UserRoles.TESTER })
  role!: UserRoles;

  @Field()
  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Field()
  @OneToMany(() => TestCase, (testCase) => testCase.user)
  testCases!: TestCase[];

  @Column({ type: "text" })
  password!: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    const hashedPassword = await hash(this.password);
    this.password = hashedPassword;
  }
}
