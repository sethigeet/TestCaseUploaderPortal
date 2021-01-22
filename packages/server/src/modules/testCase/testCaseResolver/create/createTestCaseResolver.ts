import { Arg, Mutation, Resolver } from "type-graphql";

import {
  createTestCaseSchema,
  createTestCasesSchema,
  getDoesNotExistMessage,
} from "@portal/common";

import {
  isAuthenticated,
  CurrentUser,
  ValidateArgs,
} from "../../../shared/decorators";
import { FieldError } from "../../../shared/responseTypes";

import { User } from "../../../user";

import { TestCase } from "../../testCaseEntity";
import { TestCaseResponse, TestCasesResponse } from "../TestCaseResponse";

import { CreateTestCaseInput, CreateTestCasesInput } from "./inputTypes";

const PRODUCT_CODES = ["PROD-1", "PROD-2", "PROD-3", "PROD-4"];
const MODULE_CODES = ["MOD-1", "MOD-2", "MOD-3", "MOD-4"];
const MENU_CODES = ["MEN-1", "MEN-2", "MEN-3", "MEN-4"];
const TESTING_FOR_CODES = ["TFOR-1", "TFOR-2", "TFOR-3", "TFOR-4"];
const TESTING_SCOPE_CODES = ["TSCO-1", "TSCO-2", "TSCO-3", "TSCO-4"];

@Resolver(() => TestCase)
export class CreateTestCaseResolver {
  @isAuthenticated()
  @ValidateArgs<TestCaseResponse>(createTestCaseSchema, "input")
  @Mutation(() => TestCaseResponse)
  async createTestCase(
    @Arg("input", () => CreateTestCaseInput)
    {
      case: { description, expectedResult },
      testingScope,
      testingFor,
      menuCode,
      moduleCode,
      productCode,
    }: CreateTestCaseInput,
    @CurrentUser() user: User
  ): Promise<TestCaseResponse> {
    const errors: FieldError[] = [];

    if (!PRODUCT_CODES.includes(productCode)) {
      errors.push({
        field: "productCode",
        message: getDoesNotExistMessage("productCode"),
      });
    }

    if (!MODULE_CODES.includes(moduleCode)) {
      errors.push({
        field: "moduleCode",
        message: getDoesNotExistMessage("moduleCode"),
      });
    }

    if (!MENU_CODES.includes(menuCode)) {
      errors.push({
        field: "menuCode",
        message: getDoesNotExistMessage("menuCode"),
      });
    }

    if (!TESTING_FOR_CODES.includes(testingFor)) {
      errors.push({
        field: "testingFor",
        message: getDoesNotExistMessage("testingFor"),
      });
    }

    if (!TESTING_SCOPE_CODES.includes(testingScope)) {
      errors.push({
        field: "testingScope",
        message: getDoesNotExistMessage("testingScope"),
      });
    }

    if (errors.length > 0) {
      return { errors };
    }

    let testCase: TestCase;

    try {
      testCase = await TestCase.create({
        description,
        expectedResult,
        testingScope,
        testingFor,
        menuCode,
        moduleCode,
        productCode,
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
    { cases, ...rest }: CreateTestCasesInput,
    @CurrentUser() user: User
  ): Promise<TestCasesResponse> {
    const errors: FieldError[] = [];

    if (!PRODUCT_CODES.includes(rest.productCode)) {
      errors.push({
        field: "productCode",
        message: getDoesNotExistMessage("productCode"),
      });
    }

    if (!MODULE_CODES.includes(rest.moduleCode)) {
      errors.push({
        field: "moduleCode",
        message: getDoesNotExistMessage("moduleCode"),
      });
    }

    if (!MENU_CODES.includes(rest.menuCode)) {
      errors.push({
        field: "menuCode",
        message: getDoesNotExistMessage("menuCode"),
      });
    }

    if (!TESTING_FOR_CODES.includes(rest.testingFor)) {
      errors.push({
        field: "testingFor",
        message: getDoesNotExistMessage("testingFor"),
      });
    }

    if (!TESTING_SCOPE_CODES.includes(rest.testingScope)) {
      errors.push({
        field: "testingScope",
        message: getDoesNotExistMessage("testingScope"),
      });
    }

    if (errors.length > 0) {
      return { errors };
    }

    let testCases: TestCase[];

    try {
      const toBeSaved = TestCase.create(
        cases.map((_, i) => ({
          ...rest,
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
