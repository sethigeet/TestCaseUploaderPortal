import { Arg, Mutation, Resolver } from "type-graphql";

import { createTestCaseSchema, createTestCasesSchema } from "@portal/common";

import {
  isAuthenticated,
  CurrentUser,
  ValidateArgs,
} from "../../../shared/decorators";

import { User } from "../../../user";

import { TestCase } from "../../testCaseEntity";
import { TestCaseResponse, TestCasesResponse } from "../TestCaseResponse";

import { CreateTestCaseInput, CreateTestCasesInput } from "./inputTypes";
import { checkIfIdsExist } from "./utils";

@Resolver(() => TestCase)
export class CreateTestCaseResolver {
  @isAuthenticated()
  @ValidateArgs<TestCaseResponse>(createTestCaseSchema, "input")
  @Mutation(() => TestCaseResponse)
  async createTestCase(
    @Arg("input", () => CreateTestCaseInput)
    { case: { description, expectedResult }, ...ids }: CreateTestCaseInput,
    @CurrentUser() user: User
  ): Promise<TestCaseResponse> {
    const error = await checkIfIdsExist(ids);

    if (error) {
      return { errors: [error] };
    }

    let testCase: TestCase;
    try {
      testCase = await TestCase.create({
        description,
        expectedResult,
        ...ids,
        createdBy: user,
      }).save();
    } catch (e) {
      return {
        errors: [
          {
            field: "createTestCase",
            message: "There was an error while creating your test case!",
          },
        ],
      };
    }

    return { testCase };
  }

  @isAuthenticated()
  @ValidateArgs<TestCasesResponse>(createTestCasesSchema, "input")
  @Mutation(() => TestCasesResponse)
  async createTestCases(
    @Arg("input", () => CreateTestCasesInput)
    { cases, ...codes }: CreateTestCasesInput,
    @CurrentUser() user: User
  ): Promise<TestCasesResponse> {
    const error = await checkIfIdsExist(codes);

    if (error) {
      return { errors: [error] };
    }

    let testCases: TestCase[];

    try {
      const toBeSaved = TestCase.create(
        cases.map((_, i) => ({
          ...codes,
          description: cases[i].description,
          expectedResult: cases[i].expectedResult,
          createdBy: user,
        }))
      );
      testCases = await TestCase.save(toBeSaved);
    } catch (e) {
      return {
        errors: [
          {
            field: "createTestCase",
            message: "There was an error while creating your test cases!",
          },
        ],
      };
    }

    return { testCases };
  }
}
