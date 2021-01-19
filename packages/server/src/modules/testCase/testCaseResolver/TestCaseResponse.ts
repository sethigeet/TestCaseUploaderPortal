import { ObjectType, Field } from "type-graphql";

import { TestCase } from "../testCaseEntity";
import { FieldError } from "../../shared/responseTypes";

@ObjectType()
export class TestCaseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => TestCase, { nullable: true })
  testCase?: TestCase;
}
