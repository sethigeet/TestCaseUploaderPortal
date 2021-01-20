import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTestCaseInput {
  @Field()
  productCode!: string;

  @Field()
  moduleCode!: string;

  @Field()
  menuCode!: string;

  @Field()
  testingFor!: string;

  @Field()
  testingScope!: string;

  @Field()
  description!: string;

  @Field()
  expectedResult!: string;
}
