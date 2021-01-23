import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { CurrentUser, isAuthenticated } from "../../../../shared/decorators";
import { User } from "../../../../user";

import { ProductMaster, ProductMasterHistory } from "../../productMasterEntity";

@Resolver(() => ProductMaster)
export class DeleteProductResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    const product = await ProductMaster.findOne(id);
    if (!product) {
      return false;
    }

    try {
      await ProductMasterHistory.create({
        pid: product.id,
        code: product.code,
        name: product.name,
        deprecated: product.deprecated,
        deletedAt: new Date(Date.now()),
        deletedBy: user,
      }).save();
      await product.remove();
    } catch (e) {
      return false;
    }

    return true;
  }
}
