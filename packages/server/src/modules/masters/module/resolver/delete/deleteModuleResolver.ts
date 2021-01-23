import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated } from "../../../../shared/decorators";

import { ModuleMaster } from "../../moduleMasterEntity";

@Resolver(() => ModuleMaster)
export class DeleteModuleResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: string): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    const module = await ModuleMaster.findOne(id);
    if (!module) {
      return false;
    }

    try {
      await module.remove();
    } catch {
      return false;
    }

    return true;
  }
}
