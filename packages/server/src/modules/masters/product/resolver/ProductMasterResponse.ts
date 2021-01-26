import { ObjectType, Field } from "type-graphql";

import { BaseMasterResponse } from "../../baseClasses";

import { ProductMaster } from "../productMasterEntity";

@ObjectType()
export class ProductMasterResponse extends BaseMasterResponse {
  @Field(() => ProductMaster, { nullable: true })
  product?: ProductMaster;
}
