import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated, CurrentUser } from "../../../shared/decorators";

import { User } from "../../../user";

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

    const testCase = await TestCase.findOne(id);

    if (!testCase) {
      return false;
    }

    try {
      testCase.verified = true;
      testCase.verifiedBy = user;
      testCase.updatedBy = user;
      await testCase.save();
    } catch (e) {
      return false;
    }

    return true;
  }
}
