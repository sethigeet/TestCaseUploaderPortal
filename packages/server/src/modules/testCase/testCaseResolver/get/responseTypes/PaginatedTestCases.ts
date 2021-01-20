import { ObjectType, Field } from "type-graphql";

import { TestCase } from "../../../testCaseEntity";

@ObjectType()
export class PaginatedTestCases {
  @Field(() => [TestCase])
  testCases!: TestCase[];

  @Field()
  hasMore!: boolean;
}
