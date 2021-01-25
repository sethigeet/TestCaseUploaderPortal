import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTestingForInput {
  @Field()
  menuId!: string;

  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
