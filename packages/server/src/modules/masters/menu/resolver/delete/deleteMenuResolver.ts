import { Arg, Mutation, Resolver } from "type-graphql";
import { validate } from "uuid";

import { UserRoles } from "@portal/common";

import { CurrentUser, isAuthenticated } from "../../../../shared/decorators";
import { User } from "../../../../user";

import { MenuMaster, MenuMasterHistory } from "../../menuMasterEntity";

@Resolver(() => MenuMaster)
export class DeleteMenuResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteMenu(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    if (!validate(id)) {
      throw new Error("Id must be a valid uuid!");
    }

    const menu = await MenuMaster.findOne(id);
    if (!menu) {
      return false;
    }

    try {
      await MenuMasterHistory.create({
        pid: menu.id,
        code: menu.code,
        name: menu.name,
        deprecated: menu.deprecated,
        deletedAt: new Date(Date.now()),
        deletedBy: user,
      }).save();
      await menu.remove();
    } catch {
      return false;
    }

    return true;
  }
}
