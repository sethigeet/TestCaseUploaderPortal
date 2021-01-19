import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { hash } from "argon2";

import { UserRoles } from "@portal/common";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "enum", enum: UserRoles, default: UserRoles.TESTER })
  role!: UserRoles;

  @Field(() => String)
  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "text" })
  password!: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    const hashedPassword = await hash(this.password);
    this.password = hashedPassword;
  }
}
