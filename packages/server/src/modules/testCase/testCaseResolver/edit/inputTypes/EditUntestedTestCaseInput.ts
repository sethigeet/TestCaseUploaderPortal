import { InputType, Field } from "type-graphql";

@InputType()
export class EditUntestedTestCaseInput {
  @Field()
  id!: string;

  @Field()
  description!: string;

  @Field()
  expectedResult!: string;
}
