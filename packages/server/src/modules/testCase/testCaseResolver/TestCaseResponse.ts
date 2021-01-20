import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../shared/responseTypes";

import { TestCase } from "../testCaseEntity";

@ObjectType()
export class TestCaseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => TestCase, { nullable: true })
  testCase?: TestCase;
}

@ObjectType()
export class TestCasesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [TestCase], { nullable: true })
  testCases?: TestCase[];
}
