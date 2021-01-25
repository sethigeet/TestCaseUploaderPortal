import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../../shared/responseTypes";

import { TestingForMaster } from "../testingForMasterEntity";

@ObjectType()
export class TestingForMasterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => TestingForMaster, { nullable: true })
  testingFor?: TestingForMaster;
}
