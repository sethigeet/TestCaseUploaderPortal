import { InputType, Field } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
