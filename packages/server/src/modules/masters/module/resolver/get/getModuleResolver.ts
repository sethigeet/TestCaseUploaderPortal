import { Arg, Query, Resolver } from "type-graphql";
import { validate } from "uuid";

import { isAuthenticated } from "../../../../shared/decorators";

import { ModuleMaster } from "../../moduleMasterEntity";

@Resolver(() => ModuleMaster)
export class GetModuleResolver {
  @isAuthenticated()
  @Query(() => ModuleMaster, { nullable: true })
  getModule(@Arg("id") id: string): Promise<ModuleMaster | undefined> {
    if (!id) {
      throw new Error("Id is required!");
    }

    if (!validate(id)) {
      throw new Error("Id must be a valid uuid!");
    }

    return ModuleMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "product", "menus"],
    });
  }

  @isAuthenticated()
  @Query(() => [ModuleMaster])
  getModules(@Arg("productId") productId: string): Promise<ModuleMaster[]> {
    if (!productId) {
      throw new Error("productId is required!");
    }

    if (!validate(productId)) {
      throw new Error("productId must be a valid uuid!");
    }

    return ModuleMaster.find({
      where: { product: { id: productId } },
      relations: ["createdBy", "updatedBy", "product", "menus"],
      order: { createdAt: "DESC" },
    });
  }
}
