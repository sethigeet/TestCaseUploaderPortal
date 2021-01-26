import { InputType, Field } from "type-graphql";

import { BaseCreateMasterInput } from "../../../../baseClasses";

@InputType()
export class CreateTestingForInput extends BaseCreateMasterInput {
  @Field()
  menuId!: string;
}
