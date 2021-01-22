import { UserRoles } from "@portal/common";
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field({ defaultValue: UserRoles.TESTER, nullable: true })
  role!: UserRoles;
}
