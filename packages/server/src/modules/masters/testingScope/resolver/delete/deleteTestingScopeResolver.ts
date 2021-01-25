import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { CurrentUser, isAuthenticated } from "../../../../shared/decorators";
import { User } from "../../../../user";

import {
  TestingScopeMaster,
  TestingScopeMasterHistory,
} from "../../testingScopeMasterEntity";

@Resolver(() => TestingScopeMaster)
export class DeleteTestingScopeResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteTestingScope(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    const testingScope = await TestingScopeMaster.findOne(id);
    if (!testingScope) {
      return false;
    }

    try {
      await TestingScopeMasterHistory.create({
        pid: testingScope.id,
        code: testingScope.code,
        name: testingScope.name,
        deprecated: testingScope.deprecated,
        deletedAt: new Date(Date.now()),
        deletedBy: user,
      }).save();
      await testingScope.remove();
    } catch {
      return false;
    }

    return true;
  }
}
