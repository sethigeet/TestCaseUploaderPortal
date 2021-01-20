import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated } from "../../../shared/decorators/isAuthenticated";
import { CurrentUser } from "../../../shared/decorators";

import { User } from "../../../user/userEntity";

import { TestCase } from "../../testCaseEntity";

@Resolver(() => TestCase)
export class VerifyTestCaseResolver {
  @isAuthenticated([UserRoles.SUPERVISOR, UserRoles.ADMIN])
  @Mutation(() => Boolean)
  async verifyTestCase(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      return false;
    }

    try {
      await TestCase.update({ id }, { verified: true, updatedBy: user.id });
    } catch (e) {
      return false;
    }

    return true;
  }
}