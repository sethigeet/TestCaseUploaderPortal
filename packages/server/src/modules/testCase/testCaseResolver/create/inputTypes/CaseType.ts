import { Field, InputType } from "type-graphql";

@InputType()
export class CaseType {
  @Field()
  description!: string;

  @Field()
  expectedResult!: string;
}
