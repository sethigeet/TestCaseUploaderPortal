import { InputType, Field } from "type-graphql";

@InputType()
export class EditTestingForInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
