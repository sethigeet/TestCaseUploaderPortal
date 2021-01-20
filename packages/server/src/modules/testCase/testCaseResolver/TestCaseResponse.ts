import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../shared/responseTypes";
import { User } from "../../user/userEntity";

import { TestCase } from "../testCaseEntity";

@ObjectType()
export class TestCaseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => TestCase, { nullable: true })
  testCase?: TestCase & { createdBy: User; updatedBy: User | undefined };
}

@ObjectType()
export class TestCasesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [TestCase], { nullable: true })
  testCases?: (TestCase & { createdBy: User; updatedBy: User | undefined })[];
}
