import { AfterInsert, AfterUpdate, Entity, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { TestingForMaster } from "../testingFor";
import { BaseMaster, BaseMasterHistory } from "../baseClasses";

@ObjectType()
@Entity()
export class TestingScopeMaster extends BaseMaster {
  @Field(() => TestingForMaster)
  @ManyToOne(() => TestingForMaster, (testingFor) => testingFor.tesingScopes, {
    onDelete: "CASCADE",
  })
  testingFor!: TestingForMaster;

  @AfterInsert()
  async InsertIntoHistory(): Promise<void> {
    await TestingScopeMasterHistory.create({
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
    await TestingScopeMasterHistory.create({
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
export class TestingScopeMasterHistory extends BaseMasterHistory {
  @Field(() => TestingForMaster)
  @ManyToOne(() => TestingForMaster, (testingFor) => testingFor.tesingScopes, {
    onDelete: "CASCADE",
  })
  testingFor!: TestingForMaster;
}
