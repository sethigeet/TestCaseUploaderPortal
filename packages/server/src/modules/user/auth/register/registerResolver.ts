import { Arg, Mutation, Resolver } from "type-graphql";

import { getUnavailableMessage, registerSchema } from "@portal/common";

import { UserResponse } from "../UserResponse";
import { ValidateArgs } from "../../../shared/decorators";

import { RegisterInput } from "./inputTypes";
import { User } from "../../userEntity";

@Resolver(() => User)
export class RegisterResolver {
  @ValidateArgs<UserResponse>(registerSchema, "credentials")
  @Mutation(() => UserResponse)
  async register(
    @Arg("credentials") { username, password }: RegisterInput
  ): Promise<UserResponse> {
    let user;
    try {
      user = await User.create({
        username: username,
        password: password,
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        if (err.detail.includes("Key (username)")) {
          return {
            errors: [
              {
                field: "username",
                message: getUnavailableMessage("username"),
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "registrationError",
            message: "An error occurred while registering the user!",
          },
        ],
      };
    }

    return { user };
  }
}
