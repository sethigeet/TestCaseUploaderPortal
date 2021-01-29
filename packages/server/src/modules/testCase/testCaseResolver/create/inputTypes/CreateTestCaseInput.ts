import { InputType, Field } from "type-graphql";

import { CaseType } from "./CaseType";

@InputType()
export class CreateTestCaseInput {
  @Field()
  productId!: string;

  @Field()
  moduleId!: string;

  @Field()
  menuId!: string;

  @Field()
  testingForId!: string;

  @Field()
  testingScopeId!: string;

  @Field(() => CaseType)
  case!: CaseType;
}
