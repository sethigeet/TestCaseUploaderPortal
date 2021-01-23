import { InputType, Field } from "type-graphql";

@InputType()
export class CreateModuleInput {
  @Field()
  productId!: string;

  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
