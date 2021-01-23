import {
  AfterInsert,
  AfterUpdate,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { MenuMaster } from "../menu";
import { TestingScopeMaster } from "../testingScope";
import { BaseMaster, BaseMasterHistory } from "../baseClasses";

@ObjectType()
@Entity()
export class TestingForMaster extends BaseMaster {
  @Field(() => MenuMaster)
  @ManyToOne(() => MenuMaster, (menu) => menu.testingFors, {
    onDelete: "CASCADE",
  })
  menu!: MenuMaster;

  @Field(() => [TestingScopeMaster], { nullable: true })
  @OneToMany(
    () => TestingScopeMaster,
    (testingScope) => testingScope.testingFor
  )
  tesingScopes!: TestingScopeMaster[];

  @AfterInsert()
  async InsertIntoHistory(): Promise<void> {
    await TestingForMasterHistory.create({
      pid: this.id,
      code: this.code,
      name: this.name,
      deprecated: this.deprecated,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
    }).save();
  }

  @AfterUpdate()
  async UpdateIntoHistory(): Promise<void> {
    await TestingForMasterHistory.create({
      pid: this.id,
      code: this.code,
      name: this.name,
      deprecated: this.deprecated,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    }).save();
  }
}

@ObjectType()
@Entity()
export class TestingForMasterHistory extends BaseMasterHistory {
  @Field(() => MenuMaster)
  @ManyToOne(() => MenuMaster, (menu) => menu.testingFors, {
    onDelete: "CASCADE",
  })
  menu!: MenuMaster;

  @Field(() => [TestingScopeMaster], { nullable: true })
  @OneToMany(
    () => TestingScopeMaster,
    (testingScope) => testingScope.testingFor
  )
  tesingScopes!: TestingScopeMaster[];
}
