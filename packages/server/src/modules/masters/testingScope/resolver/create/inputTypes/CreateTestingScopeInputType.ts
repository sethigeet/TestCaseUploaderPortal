import { InputType, Field } from "type-graphql";

import { BaseCreateMasterInput } from "../../../../baseClasses";

@InputType()
export class CreateTestingScopeInput extends BaseCreateMasterInput {
  @Field()
  testingForId!: string;
}
