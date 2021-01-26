import { Arg, Mutation, Resolver } from "type-graphql";

import {
  editUntestedTestCaseSchema,
  editTestedTestCaseSchema,
  getDoesNotExistMessage,
} from "@portal/common";

import {
  isAuthenticated,
  CurrentUser,
  ValidateArgs,
} from "../../../shared/decorators";

import { User } from "../../../user";

import { TestCase } from "../../testCaseEntity";
import { TestCaseResponse } from "../TestCaseResponse";

import {
  EditUntestedTestCaseInput,
  EditTestedTestCaseInput,
} from "./inputTypes";

@Resolver(() => TestCase)
export class EditTestCaseResolver {
  @isAuthenticated()
  @ValidateArgs<TestCaseResponse>(editUntestedTestCaseSchema, "input")
  @Mutation(() => TestCaseResponse)
  async editUntestedTestCase(
    @Arg("input", () => EditUntestedTestCaseInput)
    { id, description, expectedResult }: EditUntestedTestCaseInput,
    @CurrentUser() user: User
  ): Promise<TestCaseResponse> {
    const testCase = await TestCase.findOne(id, {
      relations: ["createdBy", "updatedBy"],
    });

    if (!testCase) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    if (testCase.createdBy.id !== user.id) {
      throw new Error("Insufficient permissions!");
    }

    if (testCase.actualResult !== null) {
      throw new Error("That test case has already been tested!");
    }

    testCase.description = description;
    testCase.expectedResult = expectedResult;
    testCase.updatedBy = user;

    try {
      await testCase.save();
    } catch (e) {
      return {
        errors: [
          {
            field: "editUntestedTestCase",
            message: "There was an error while editing your test case!",
          },
        ],
      };
    }

    return { testCase };
  }

  @isAuthenticated()
  @ValidateArgs<TestCaseResponse>(editTestedTestCaseSchema, "input")
  @Mutation(() => TestCaseResponse)
  async editTestedTestCase(
    @Arg("input", () => EditTestedTestCaseInput)
    { id, actualResult, userRemarks }: EditTestedTestCaseInput,
    @CurrentUser() user: User
  ): Promise<TestCaseResponse> {
    const testCase = await TestCase.findOne(id, {
      relations: ["createdBy", "updatedBy"],
    });

    if (!testCase) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    if (testCase.createdBy.id !== user.id) {
      throw new Error("Insufficient permissions!");
    }

    if (testCase.actualResult === null) {
      throw new Error("That test case has not yet been tested!");
    }

    testCase.actualResult = actualResult;
    testCase.userRemarks = userRemarks;
    testCase.updatedBy = user;

    try {
      await testCase.save();
    } catch (e) {
      return {
        errors: [
          {
            field: "editTestedTestCase",
            message: "There was an error while editing your test case!",
          },
        ],
      };
    }

    return { testCase };
  }
}
