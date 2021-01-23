import { Entity, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { TestingForMaster } from "../testingFor";
import { BaseMaster } from "../baseClasses";

@ObjectType()
@Entity()
export class TestingScopeMaster extends BaseMaster {
  @Field(() => TestingForMaster)
  @ManyToOne(() => TestingForMaster, (testingFor) => testingFor.tesingScopes, {
    onDelete: "CASCADE",
  })
  testingFor!: TestingForMaster;
}
