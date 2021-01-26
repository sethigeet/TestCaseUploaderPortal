import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../shared/responseTypes";

@ObjectType()
export class BaseMasterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
