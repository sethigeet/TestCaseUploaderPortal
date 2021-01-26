import { ObjectType, Field } from "type-graphql";

import { BaseMasterResponse } from "../../baseClasses";

import { TestingScopeMaster } from "../testingScopeMasterEntity";

@ObjectType()
export class TestingScopeMasterResponse extends BaseMasterResponse {
  @Field(() => TestingScopeMaster, { nullable: true })
  testingScope?: TestingScopeMaster;
}
