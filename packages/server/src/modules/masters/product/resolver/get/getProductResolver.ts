import { Arg, Query, Resolver } from "type-graphql";

import { isAuthenticated } from "../../../../shared/decorators";

import { ProductMaster } from "../../productMasterEntity";

@Resolver(() => ProductMaster)
export class GetProductResolver {
  @isAuthenticated()
  @Query(() => ProductMaster, { nullable: true })
  getProduct(@Arg("id") id: string): Promise<ProductMaster | undefined> {
    if (!id) {
      throw new Error("Id is required!");
    }
    return ProductMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "modules"],
    });
  }

  @isAuthenticated()
  @Query(() => [ProductMaster])
  getProducts(): Promise<ProductMaster[]> {
    return ProductMaster.find({
      relations: ["createdBy", "updatedBy", "modules"],
      order: { code: "ASC" },
    });
  }
}
