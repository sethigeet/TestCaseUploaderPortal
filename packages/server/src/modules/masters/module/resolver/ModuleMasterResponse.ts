import { ObjectType, Field } from "type-graphql";

import { BaseMasterResponse } from "../../baseClasses";

import { ModuleMaster } from "../moduleMasterEntity";

@ObjectType()
export class ModuleMasterResponse extends BaseMasterResponse {
  @Field(() => ModuleMaster, { nullable: true })
  module?: ModuleMaster;
}
