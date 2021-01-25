import { Arg, Mutation, Resolver } from "type-graphql";

import {
  createMenuSchema,
  editMenuSchema,
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
import { ModuleMaster } from "../../../module";

import { MenuMaster } from "../../menuMasterEntity";

import { MenuMasterResponse } from "../MenuMasterResponse";

import { CreateMenuInput, EditMenuInput } from "./inputTypes";

@Resolver(() => MenuMaster)
export class CreateMenuResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<MenuMasterResponse>(createMenuSchema, "input")
  @Mutation(() => MenuMasterResponse)
  async createMenu(
    @Arg("input", () => CreateMenuInput)
    { moduleId, code, name, deprecated }: CreateMenuInput,
    @CurrentUser() user: User
  ): Promise<MenuMasterResponse> {
    const module = await ModuleMaster.findOne(moduleId);
    if (!module) {
      return {
        errors: [
          {
            field: "moduleId",
            message: getDoesNotExistMessage("moduleId"),
          },
        ],
      };
    }

    let menu: MenuMaster;
    try {
      menu = await MenuMaster.create({
        module,
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
            field: "createMenu",
            message: "There was an error while creating your menu!",
          },
        ],
      };
    }

    return { menu };
  }

  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<MenuMasterResponse>(editMenuSchema, "input")
  @Mutation(() => MenuMasterResponse)
  async editMenu(
    @Arg("id") id: string,
    @Arg("input", () => EditMenuInput)
    { code, name, deprecated }: EditMenuInput,
    @CurrentUser() user: User
  ): Promise<MenuMasterResponse> {
    if (!id) {
      return { errors: [{ field: "id", message: getRequiredMessage("id") }] };
    }

    const menu = await MenuMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "module"],
    });
    if (!menu) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    menu.code = code;
    menu.name = name;
    if (deprecated) {
      menu.deprecated = deprecated;
    }
    menu.updatedBy = user;

    try {
      await menu.save();
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
            field: "editMenu",
            message: "There was an error while updating your menu!",
          },
        ],
      };
    }

    return { menu };
  }
}
