import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated } from "../../../../shared/decorators";

import { ProductMaster } from "../../productMasterEntity";

@Resolver(() => ProductMaster)
export class DeleteProductResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: string): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    const product = await ProductMaster.findOne(id);
    if (!product) {
      return false;
    }

    try {
      await product.remove();
    } catch {
      return false;
    }

    return true;
  }
}
