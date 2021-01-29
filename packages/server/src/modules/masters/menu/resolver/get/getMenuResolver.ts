import { Arg, Query, Resolver } from "type-graphql";
import { validate } from "uuid";

import { isAuthenticated } from "../../../../shared/decorators";

import { MenuMaster } from "../../menuMasterEntity";

@Resolver(() => MenuMaster)
export class GetMenuResolver {
  @isAuthenticated()
  @Query(() => MenuMaster, { nullable: true })
  getMenu(@Arg("id") id: string): Promise<MenuMaster | undefined> {
    if (!id) {
      throw new Error("Id is required!");
    }

    if (!validate(id)) {
      throw new Error("Id must be a valid uuid!");
    }

    return MenuMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "module", "testingFors"],
    });
  }

  @isAuthenticated()
  @Query(() => [MenuMaster])
  getMenus(@Arg("moduleId") moduleId: string): Promise<MenuMaster[]> {
    if (!moduleId) {
      throw new Error("moduleId is required!");
    }

    if (!validate(moduleId)) {
      throw new Error("moduleId must be a valid uuid!");
    }

    return MenuMaster.find({
      where: { module: { id: moduleId } },
      relations: ["createdBy", "updatedBy", "module", "testingFors"],
      order: { createdAt: "DESC" },
    });
  }
}
