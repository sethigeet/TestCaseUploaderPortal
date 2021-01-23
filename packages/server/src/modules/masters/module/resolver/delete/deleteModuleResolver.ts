import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { CurrentUser, isAuthenticated } from "../../../../shared/decorators";
import { User } from "../../../../user";

import { ModuleMaster, ModuleMasterHistory } from "../../moduleMasterEntity";

@Resolver(() => ModuleMaster)
export class DeleteModuleResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteModule(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    const module = await ModuleMaster.findOne(id);
    if (!module) {
      return false;
    }

    try {
      await ModuleMasterHistory.create({
        pid: module.id,
        code: module.code,
        name: module.name,
        deprecated: module.deprecated,
        deletedAt: new Date(Date.now()),
        deletedBy: user,
      }).save();
      await module.remove();
    } catch {
      return false;
    }

    return true;
  }
}
