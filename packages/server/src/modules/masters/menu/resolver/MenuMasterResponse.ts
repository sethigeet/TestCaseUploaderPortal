import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../../shared/responseTypes";

import { MenuMaster } from "../menuMasterEntity";

@ObjectType()
export class MenuMasterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => MenuMaster, { nullable: true })
  menu?: MenuMaster;
}
