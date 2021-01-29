import { Arg, Query, Resolver } from "type-graphql";
import { validate } from "uuid";

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

    if (!validate(id)) {
      throw new Error("Id must be a valid uuid!");
    }

    return TestingForMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "menu", "testingScopes"],
    });
  }

  @isAuthenticated()
  @Query(() => [TestingForMaster])
  getTestingFors(@Arg("menuId") menuId: string): Promise<TestingForMaster[]> {
    if (!menuId) {
      throw new Error("menuId is required!");
    }

    if (!validate(menuId)) {
      throw new Error("menuId must be a valid uuid!");
    }

    return TestingForMaster.find({
      where: { menu: { id: menuId } },
      relations: ["createdBy", "updatedBy", "menu", "testingScopes"],
      order: { createdAt: "DESC" },
    });
  }
}
