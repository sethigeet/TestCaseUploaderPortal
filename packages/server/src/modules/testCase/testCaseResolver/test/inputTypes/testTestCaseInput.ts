import { InputType, Field } from "type-graphql";

@InputType()
export class TestTestCaseInput {
  @Field()
  id!: string;

  @Field()
  passed!: boolean;

  @Field()
  actualResult!: string;

  @Field()
  userRemarks!: string;
}
