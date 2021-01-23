import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../../shared/responseTypes";

import { ModuleMaster } from "../moduleMasterEntity";

@ObjectType()
export class ModuleMasterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ModuleMaster, { nullable: true })
  module?: ModuleMaster;
}
