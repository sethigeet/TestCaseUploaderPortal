import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated } from "../../../shared/decorators/isAuthenticated";

import { TestCase } from "../../testCaseEntity";

@Resolver(() => TestCase)
export class VerifyTestCaseResolver {
  @isAuthenticated([UserRoles.SUPERVISOR, UserRoles.ADMIN])
  @Mutation(() => Boolean)
  async verifyTestCase(@Arg("id") id: string): Promise<boolean> {
    if (!id) {
      return false;
    }

    try {
      await TestCase.update({ id }, { verified: true });
    } catch (e) {
      return false;
    }

    return true;
  }
}
