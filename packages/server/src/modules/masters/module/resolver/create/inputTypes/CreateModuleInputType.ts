import { InputType, Field } from "type-graphql";

import { BaseCreateMasterInput } from "../../../../baseClasses";

@InputType()
export class CreateModuleInput extends BaseCreateMasterInput {
  @Field()
  productId!: string;
}
