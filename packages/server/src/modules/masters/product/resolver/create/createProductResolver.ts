import { Arg, Mutation, Resolver } from "type-graphql";

import {
  createProductSchema,
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

import { ProductMaster } from "../../productMasterEntity";

import { ProductMasterResponse } from "../ProductMasterResponse";

import { CreateProductInput } from "./inputTypes";

@Resolver(() => ProductMaster)
export class CreateProductResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<ProductMasterResponse>(createProductSchema, "input")
  @Mutation(() => ProductMasterResponse)
  async createProduct(
    @Arg("input", () => CreateProductInput)
    { code, name, deprecated }: CreateProductInput,
    @CurrentUser() user: User
  ): Promise<ProductMasterResponse> {
    let product: ProductMaster;

    try {
      product = await ProductMaster.create({
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
            field: "createProduct",
            message: "There was an error while creating your product!",
          },
        ],
      };
    }

    return { product };
  }

  @isAuthenticated(UserRoles.ADMIN)
  @ValidateArgs<ProductMasterResponse>(createProductSchema, "input")
  @Mutation(() => ProductMasterResponse)
  async editProduct(
    @Arg("id") id: string,
    @Arg("input", () => CreateProductInput)
    { code, name, deprecated }: CreateProductInput,
    @CurrentUser() user: User
  ): Promise<ProductMasterResponse> {
    if (!id) {
      return { errors: [{ field: "id", message: getRequiredMessage("id") }] };
    }

    const product = await ProductMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "modules"],
    });
    if (!product) {
      return {
        errors: [{ field: "id", message: getDoesNotExistMessage("id") }],
      };
    }

    product.code = code;
    product.name = name;
    if (deprecated !== undefined) {
      product.deprecated = deprecated;
    }
    product.updatedBy = user;

    try {
      await product.save();
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

    return { product };
  }
}
