import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles, testTestCaseSchema } from "@portal/common";

import { isAuthenticated } from "../../../shared/decorators/isAuthenticated";
import { CurrentUser, ValidateArgs } from "../../../shared/decorators";

import { User } from "../../../user/userEntity";

import { TestCase } from "../../testCaseEntity";

import { TestTestCaseInput } from "./inputTypes";

@Resolver(() => TestCase)
export class TestTestCaseResolver {
  @isAuthenticated()
  @ValidateArgs(testTestCaseSchema, "input")
  @Mutation(() => TestCase)
  async testTestCase(
    @Arg("input", () => TestTestCaseInput) input: TestTestCaseInput,
    @CurrentUser() user: User
  ): Promise<TestCase> {
    const testCase = await TestCase.findOne(input.id);

    if (!testCase) {
      throw new Error("That test case does not exist!");
    }

    if (!testCase.verified) {
      throw new Error("That test case is not verified!");
    }

    if (user.role === UserRoles.TESTER) {
      if (testCase.createdBy !== user.id) {
        throw new Error("Insufficient Permissions!");
      }
    }

    try {
      testCase.passed = input.passed;
      testCase.actualResult = input.actualResult;
      testCase.userRemarks = input.userRemarks;

      await testCase.save();
    } catch (e) {
      throw new Error("An error occurred while updating the test!");
    }

    return testCase;
  }
}
