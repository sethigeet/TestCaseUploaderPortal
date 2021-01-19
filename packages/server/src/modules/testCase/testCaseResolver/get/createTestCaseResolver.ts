import { Arg, Query, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated } from "../../../shared/decorators/isAuthenticated";
import { CurrentUser } from "../../../shared/decorators";
import { User } from "../../../user/userEntity";

import { TestCase } from "../../testCaseEntity";
import { TestCaseResponse } from "../TestCaseResponse";

@Resolver(() => TestCase)
export class GetTestCaseResolver {
  @isAuthenticated()
  @Query(() => TestCaseResponse, { nullable: true })
  async getTestCase(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<TestCase | undefined> {
    const testCase = await TestCase.findOne(id);

    if (!testCase) {
      return undefined;
    }

    if (user.role === UserRoles.TESTER) {
      if (testCase.userId !== user.id) {
        throw new Error("Not allowed");
      }
    }

    return testCase;
  }

  @isAuthenticated()
  @Query(() => TestCaseResponse, { nullable: true })
  async getTestCases(@CurrentUser() user: User): Promise<TestCase[]> {
    if (user.role === UserRoles.TESTER) {
      return TestCase.find({ where: { userId: user.id } });
    }

    return TestCase.find();
  }
}
