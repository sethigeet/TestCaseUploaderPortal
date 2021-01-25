import { Arg, Query, Resolver } from "type-graphql";

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
    return ModuleMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "product"],
    });
  }

  @isAuthenticated()
  @Query(() => [ModuleMaster])
  getModules(@Arg("productId") productId: string): Promise<ModuleMaster[]> {
    if (!productId) {
      throw new Error("productId is required!");
    }
    return ModuleMaster.find({
      where: { product: { id: productId } },
      relations: ["createdBy", "updatedBy", "product"],
      order: { createdAt: "DESC" },
    });
  }
}
