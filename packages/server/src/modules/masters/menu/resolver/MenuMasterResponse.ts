import { ObjectType, Field } from "type-graphql";

import { BaseMasterResponse } from "../../baseClasses";

import { MenuMaster } from "../menuMasterEntity";

@ObjectType()
export class MenuMasterResponse extends BaseMasterResponse {
  @Field(() => MenuMaster, { nullable: true })
  menu?: MenuMaster;
}
