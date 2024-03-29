import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles, testTestCaseSchema } from "@portal/common";

import {
  isAuthenticated,
  CurrentUser,
  ValidateArgs,
} from "../../../shared/decorators";

import { User } from "../../../user";

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
    const testCase = await TestCase.findOne(input.id, {
      relations: ["createdBy", "updatedBy"],
    });

    if (!testCase) {
      throw new Error("That test case does not exist!");
    }

    if (!testCase.verified) {
      throw new Error("That test case is not verified!");
    }

    if (user.role === UserRoles.TESTER) {
      if (testCase.createdBy.id !== user.id) {
        throw new Error("Insufficient Permissions!");
      }
    }

    try {
      testCase.passed = input.passed;
      testCase.actualResult = input.actualResult;
      testCase.userRemarks = input.userRemarks;
      testCase.updatedBy = user;

      await testCase.save();
    } catch (e) {
      throw new Error("An error occurred while updating the test!");
    }

    return testCase;
  }
}
