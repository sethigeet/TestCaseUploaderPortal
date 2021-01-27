import { verify } from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import {
  loginSchema,
  getDoesNotExistMessage,
  getIncorrectPasswordMessage,
} from "@portal/common";

import { Context } from "../../../shared/types";
import { UserResponse } from "../UserResponse";
import { ValidateArgs } from "../../../shared/decorators";

import { User } from "../../userEntity";
import { LoginInput } from "./inputTypes";
import { USER_SESSION_IDS_PREFIX } from "../cosntants";

@Resolver(() => User)
export class LoginResolver {
  @ValidateArgs<UserResponse>(loginSchema, "credentials")
  @Mutation(() => UserResponse)
  async login(
    @Arg("credentials") { username, password }: LoginInput,
    @Ctx() { req, redisClient, loaders: { userLoader } }: Context
  ): Promise<UserResponse> {
    let user: User;
    try {
      user = await userLoader.load({ username });
    } catch (e) {
      if (e.message === "User not found!") {
        return {
          errors: [
            {
              field: "username",
              message: getDoesNotExistMessage("username"),
            },
          ],
        };
      }

      return {
        errors: [
          {
            field: "login",
            message: "There was an error while logging you in!",
          },
        ],
      };
    }

    const valid = await verify(user.password, password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: getIncorrectPasswordMessage() }],
      };
    }

    req.session.userId = user.id;
    await redisClient.lpush(USER_SESSION_IDS_PREFIX + user.id, req.sessionID);

    return { user };
  }
}
