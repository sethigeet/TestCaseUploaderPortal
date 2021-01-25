import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../../shared/responseTypes";

import { TestingScopeMaster } from "../testingScopeMasterEntity";

@ObjectType()
export class TestingScopeMasterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => TestingScopeMaster, { nullable: true })
  testingScope?: TestingScopeMaster;
}
