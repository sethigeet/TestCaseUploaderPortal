import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../../user";

import { ModuleMaster } from "../module";
import { TestingForMaster } from "../testingFor";

@ObjectType()
@Entity()
export class MenuMaster extends BaseEntity {
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

  @Field(() => ModuleMaster)
  @ManyToOne(() => ModuleMaster, (module) => module.menus, {
    onDelete: "CASCADE",
  })
  module!: ModuleMaster;

  @Field(() => [TestingForMaster], { nullable: true })
  @OneToMany(() => TestingForMaster, (testingFor) => testingFor.menu)
  testingFors!: TestingForMaster[];

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
}
