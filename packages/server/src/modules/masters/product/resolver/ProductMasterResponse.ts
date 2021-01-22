import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../../shared/responseTypes";

import { ProductMaster } from "../productMasterEntity";

@ObjectType()
export class ProductMasterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ProductMaster, { nullable: true })
  product?: ProductMaster;
}
