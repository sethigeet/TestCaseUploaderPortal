import { Arg, Int, Query, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated } from "../../../shared/decorators/isAuthenticated";
import { CurrentUser } from "../../../shared/decorators";
import { User } from "../../../user/userEntity";

import { TestCase } from "../../testCaseEntity";
import { PaginatedTestCases } from "./responseTypes";
import { getConnection } from "typeorm";

@Resolver(() => TestCase)
export class GetTestCaseResolver {
  @isAuthenticated()
  @Query(() => TestCase, { nullable: true })
  async getTestCase(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<TestCase | undefined> {
    if (!id) {
      return undefined;
    }

    const testCase = await TestCase.findOne(id);

    if (!testCase) {
      return undefined;
    }

    if (user.role === UserRoles.TESTER) {
      if (testCase.createdBy !== user.id) {
        throw new Error("Not allowed");
      }
    }

    return testCase;
  }

  @isAuthenticated()
  @Query(() => PaginatedTestCases)
  async getTestCases(
    @CurrentUser() user: User,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<PaginatedTestCases> {
    if (!limit) {
      throw new Error("Limit is a required argument!");
    }

    const realLimit = Math.min(30, limit);
    const realLimitPlusOne = realLimit + 1;

    const conn = getConnection();
    const query = conn.createQueryBuilder().select("*").from(TestCase, "t");

    if (user.role === UserRoles.TESTER) {
      query.where('t."createdBy" = :userId', { userId: user.id });
      if (cursor) {
        query.andWhere('t."createdAt" < :cursor', {
          cursor: new Date(parseInt(cursor)),
        });
      }
    } else {
      if (cursor) {
        query.andWhere('t."createdAt" < :cursor', {
          cursor: new Date(parseInt(cursor)),
        });
      }
    }

    query.orderBy('t."createdAt"', "DESC");
    query.take(realLimitPlusOne);

    let testCases: any;
    try {
      testCases = await query.execute();
    } catch (e) {
      // console.log(e);
      throw new Error(`An error occurred while fetching the results!, ${e}`);
    }

    return {
      testCases: testCases.slice(0, realLimit),
      hasMore: testCases.length === realLimitPlusOne ? true : false,
    };
  }
}
