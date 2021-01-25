import { InputType, Field } from "type-graphql";

@InputType()
export class EditMenuInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
