import { InputType, Field } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
