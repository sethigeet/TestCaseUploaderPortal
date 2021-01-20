import { InputType, Field } from "type-graphql";

import { CaseType } from "./CaseType";

@InputType()
export class CreateTestCasesInput {
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

  @Field(() => [CaseType])
  cases!: CaseType[];
}
