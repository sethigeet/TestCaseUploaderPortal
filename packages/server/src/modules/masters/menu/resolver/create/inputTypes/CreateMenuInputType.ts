import { InputType, Field } from "type-graphql";

@InputType()
export class CreateMenuInput {
  @Field()
  moduleId!: string;

  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
