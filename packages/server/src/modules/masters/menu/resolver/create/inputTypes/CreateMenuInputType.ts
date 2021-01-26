import { InputType, Field } from "type-graphql";

import { BaseCreateMasterInput } from "../../../../baseClasses";

@InputType()
export class CreateMenuInput extends BaseCreateMasterInput {
  @Field()
  moduleId!: string;
}
