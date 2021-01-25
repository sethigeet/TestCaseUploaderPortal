import { Arg, Mutation, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { CurrentUser, isAuthenticated } from "../../../../shared/decorators";
import { User } from "../../../../user";

import {
  TestingForMaster,
  TestingForMasterHistory,
} from "../../testingForMasterEntity";

@Resolver(() => TestingForMaster)
export class DeleteTestingForResolver {
  @isAuthenticated(UserRoles.ADMIN)
  @Mutation(() => Boolean)
  async deleteTestingFor(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      throw new Error("Id is required!");
    }

    const testingFor = await TestingForMaster.findOne(id);
    if (!testingFor) {
      return false;
    }

    try {
      await TestingForMasterHistory.create({
        pid: testingFor.id,
        code: testingFor.code,
        name: testingFor.name,
        deprecated: testingFor.deprecated,
        deletedAt: new Date(Date.now()),
        deletedBy: user,
      }).save();
      await testingFor.remove();
    } catch {
      return false;
    }

    return true;
  }
}
