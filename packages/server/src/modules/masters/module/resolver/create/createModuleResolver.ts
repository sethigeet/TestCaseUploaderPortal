import { Arg, Mutation, Resolver } from "type-graphql";

import {
  createModuleSchema,
  editModuleSchema,
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

import { ProductMaster } from "../../../product";

import { ModuleMaster } from "../../moduleMasterEntity";

import { ModuleMasterResponse } from "../ModuleMasterResponse";

import { CreateModuleInput, EditModuleInput } from "./inputTypes";

@Resolver(() => ModuleMaster)
export class CreateModuleResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<ModuleMasterResponse>(createModuleSchema, "input")
  @Mutation(() => ModuleMasterResponse)
  async createModule(
    @Arg("input", () => CreateModuleInput)
    { productId, code, name, deprecated }: CreateModuleInput,
    @CurrentUser() user: User
  ): Promise<ModuleMasterResponse> {
    const product = await ProductMaster.findOne(productId);
    if (!product) {
      return {
        errors: [
          {
            field: "productId",
            message: getDoesNotExistMessage("productId"),
          },
        ],
      };
    }

    let module: ModuleMaster;
    try {
      module = await ModuleMaster.create({
        product,
        code,
        name,
        deprecated: deprecated ? deprecated : undefined,
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
            field: "createProduct",
            message: "There was an error while creating your product!",
          },
        ],
      };
    }

    return { module };
  }

  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<ModuleMasterResponse>(editModuleSchema, "input")
  @Mutation(() => ModuleMasterResponse)
  async editModule(
    @Arg("id") id: string,
    @Arg("input", () => EditModuleInput)
    { code, name, deprecated }: EditModuleInput,
    @CurrentUser() user: User
  ): Promise<ModuleMasterResponse> {
    if (!id) {
      return { errors: [{ field: "id", message: getRequiredMessage("id") }] };
    }

    const module = await ModuleMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "product"],
    });
    if (!module) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    module.code = code;
    module.name = name;
    if (deprecated) {
      module.deprecated = deprecated;
    }
    module.updatedBy = user;

    try {
      await module.save();
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
            field: "editProduct",
            message: "There was an error while updating your product!",
          },
        ],
      };
    }

    return { module };
  }
}
