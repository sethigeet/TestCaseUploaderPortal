import { ObjectType, Field } from "type-graphql";

import { BaseMasterResponse } from "../../baseClasses";

import { TestingForMaster } from "../testingForMasterEntity";

@ObjectType()
export class TestingForMasterResponse extends BaseMasterResponse {
  @Field(() => TestingForMaster, { nullable: true })
  testingFor?: TestingForMaster;
}
