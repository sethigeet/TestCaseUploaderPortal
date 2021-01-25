import { Arg, Query, Resolver } from "type-graphql";

import { isAuthenticated } from "../../../../shared/decorators";

import { TestingForMaster } from "../../testingForMasterEntity";

@Resolver(() => TestingForMaster)
export class GetTestingForResolver {
  @isAuthenticated()
  @Query(() => TestingForMaster, { nullable: true })
  getTestingFor(@Arg("id") id: string): Promise<TestingForMaster | undefined> {
    if (!id) {
      throw new Error("Id is required!");
    }
    return TestingForMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "menu"],
    });
  }

  @isAuthenticated()
  @Query(() => [TestingForMaster])
  getTestingFors(@Arg("menuId") menuId: string): Promise<TestingForMaster[]> {
    if (!menuId) {
      throw new Error("menuId is required!");
    }
    return TestingForMaster.find({
      where: { menu: { id: menuId } },
      relations: ["createdBy", "updatedBy", "menu"],
      order: { createdAt: "DESC" },
    });
  }
}
