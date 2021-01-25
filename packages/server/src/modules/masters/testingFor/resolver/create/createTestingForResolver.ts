import { Arg, Mutation, Resolver } from "type-graphql";

import {
  createTestingForSchema,
  editTestingForSchema,
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
import { MenuMaster } from "../../../menu";

import { TestingForMaster } from "../../testingForMasterEntity";

import { TestingForMasterResponse } from "../TestingForMasterResponse";

import { CreateTestingForInput, EditTestingForInput } from "./inputTypes";

@Resolver(() => TestingForMaster)
export class CreateTestingForResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<TestingForMasterResponse>(createTestingForSchema, "input")
  @Mutation(() => TestingForMasterResponse)
  async createTestingFor(
    @Arg("input", () => CreateTestingForInput)
    { menuId, code, name, deprecated }: CreateTestingForInput,
    @CurrentUser() user: User
  ): Promise<TestingForMasterResponse> {
    const menu = await MenuMaster.findOne(menuId);
    if (!menu) {
      return {
        errors: [
          {
            field: "moduleId",
            message: getDoesNotExistMessage("moduleId"),
          },
        ],
      };
    }

    let testingFor: TestingForMaster;
    try {
      testingFor = await TestingForMaster.create({
        menu,
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
            field: "createTestingFor",
            message: "There was an error while creating your testingFor!",
          },
        ],
      };
    }

    return { testingFor };
  }

  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<TestingForMasterResponse>(editTestingForSchema, "input")
  @Mutation(() => TestingForMasterResponse)
  async editTestingFor(
    @Arg("id") id: string,
    @Arg("input", () => EditTestingForInput)
    { code, name, deprecated }: EditTestingForInput,
    @CurrentUser() user: User
  ): Promise<TestingForMasterResponse> {
    if (!id) {
      return { errors: [{ field: "id", message: getRequiredMessage("id") }] };
    }

    const testingFor = await TestingForMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "menu"],
    });
    if (!testingFor) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    testingFor.code = code;
    testingFor.name = name;
    if (deprecated) {
      testingFor.deprecated = deprecated;
    }
    testingFor.updatedBy = user;

    try {
      await testingFor.save();
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
            field: "editTestingFor",
            message: "There was an error while updating your testingFor!",
          },
        ],
      };
    }

    return { testingFor };
  }
}
