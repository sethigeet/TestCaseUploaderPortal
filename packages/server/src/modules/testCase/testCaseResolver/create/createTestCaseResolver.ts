import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { createTestCaseSchema, getDoesNotExistMessage } from "@portal/common";

import { ValidateArgs } from "../../../shared/decorators";
import { FieldError } from "../../../shared/responseTypes";
import { Context } from "../../../shared/types";
import { isAuthenticated } from "../../../shared/decorators/isAuthenticated";

import { TestCase } from "../../testCaseEntity";
import { TestCaseResponse } from "../TestCaseResponse";

import { CreateTestCaseInput } from "./inputTypes";

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
    @Arg("input") input: CreateTestCaseInput,
    @Ctx() { req }: Context
  ): Promise<TestCaseResponse> {
    const errors: FieldError[] = [];

    if (!PRODUCT_CODES.includes(input.productCode)) {
      errors.push({
        field: "productCode",
        message: getDoesNotExistMessage("productCode"),
      });
    }

    if (!MODULE_CODES.includes(input.moduleCode)) {
      errors.push({
        field: "moduleCode",
        message: getDoesNotExistMessage("moduleCode"),
      });
    }

    if (!MENU_CODES.includes(input.menuCode)) {
      errors.push({
        field: "menuCode",
        message: getDoesNotExistMessage("menuCode"),
      });
    }

    if (!TESTING_FOR_CODES.includes(input.testingFor)) {
      errors.push({
        field: "testingFor",
        message: getDoesNotExistMessage("testingFor"),
      });
    }

    if (!TESTING_SCOPE_CODES.includes(input.testingScope)) {
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
        ...input,
        createdBy: req.session.userId,
      }).save();
    } catch (e) {
      console.log(e);
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
}
