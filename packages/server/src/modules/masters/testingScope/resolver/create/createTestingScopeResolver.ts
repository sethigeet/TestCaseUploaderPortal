import { Arg, Mutation, Resolver } from "type-graphql";

import {
  createTestingScopeSchema,
  editTestingScopeSchema,
  getDoesNotExistMessage,
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import {
  isAuthenticated,
  CurrentUser,
  ValidateArgs,
} from "../../../../shared/decorators";

import { User } from "../../../../user";
import { TestingForMaster } from "../../../testingFor";

import { TestingScopeMaster } from "../../testingScopeMasterEntity";

import { TestingScopeMasterResponse } from "../TestingScopeMasterResponse";

import { CreateTestingScopeInput, EditTestingScopeInput } from "./inputTypes";

@Resolver(() => TestingScopeMaster)
export class CreateTestingScopeResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<TestingScopeMasterResponse>(createTestingScopeSchema, "input")
  @Mutation(() => TestingScopeMasterResponse)
  async createTestingScope(
    @Arg("input", () => CreateTestingScopeInput)
    { testingForId, code, name, deprecated }: CreateTestingScopeInput,
    @CurrentUser() user: User
  ): Promise<TestingScopeMasterResponse> {
    const testingFor = await TestingForMaster.findOne(testingForId);
    if (!testingFor) {
      return {
        errors: [
          {
            field: "moduleId",
            message: getDoesNotExistMessage("moduleId"),
          },
        ],
      };
    }

    let testingScope: TestingScopeMaster;
    try {
      testingScope = await TestingScopeMaster.create({
        testingFor,
        code,
        name,
        deprecated: deprecated || undefined,
        createdBy: user,
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        if (err.detail.includes("Key (code)")) {
          return {
            errors: [
              {
                field: "code",
                message: getUnavailableMessage("code"),
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "createTestingScope",
            message: "There was an error while creating your testingScope!",
          },
        ],
      };
    }

    return { testingScope };
  }

  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<TestingScopeMasterResponse>(editTestingScopeSchema, "input")
  @Mutation(() => TestingScopeMasterResponse)
  async editTestingScope(
    @Arg("id") id: string,
    @Arg("input", () => EditTestingScopeInput)
    { code, name, deprecated }: EditTestingScopeInput,
    @CurrentUser() user: User
  ): Promise<TestingScopeMasterResponse> {
    if (!id) {
      return { errors: [{ field: "id", message: getRequiredMessage("id") }] };
    }

    const testingScope = await TestingScopeMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "testingFor"],
    });
    if (!testingScope) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    testingScope.code = code;
    testingScope.name = name;
    if (deprecated) {
      testingScope.deprecated = deprecated;
    }
    testingScope.updatedBy = user;

    try {
      await testingScope.save();
    } catch (err) {
      if (err.code === "23505") {
        if (err.detail.includes("Key (code)")) {
          return {
            errors: [
              {
                field: "code",
                message: getUnavailableMessage("code"),
              },
            ],
          };
        }
      }

      return {
        errors: [
          {
            field: "editTestingScope",
            message: "There was an error while updating your testingScope!",
          },
        ],
      };
    }

    return { testingScope };
  }
}
