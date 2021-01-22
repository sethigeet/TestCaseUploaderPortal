import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../../user";

import { MenuMaster } from "../menu";
import { TestingScopeMaster } from "../testingScope";

@ObjectType()
@Entity()
export class TestingForMaster extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "varchar", length: 10, unique: true })
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  name!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  deprecated!: boolean;

  @Field(() => MenuMaster)
  @ManyToOne(() => MenuMaster, (menu) => menu.testingFors)
  menu!: MenuMaster;

  @Field(() => [TestingScopeMaster], { nullable: true })
  @OneToMany(
    () => TestingScopeMaster,
    (testingScope) => testingScope.testingFor
  )
  tesingScopes!: TestingScopeMaster[];

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