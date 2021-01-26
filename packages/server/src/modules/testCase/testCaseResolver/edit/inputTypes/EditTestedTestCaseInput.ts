import { InputType, Field } from "type-graphql";

@InputType()
export class EditTestedTestCaseInput {
  @Field()
  id!: string;

  @Field()
  actualResult!: string;

  @Field()
  userRemarks!: string;
}
