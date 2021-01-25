import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTestingScopeInput {
  @Field()
  testingForId!: string;

  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  deprecated?: boolean;
}
