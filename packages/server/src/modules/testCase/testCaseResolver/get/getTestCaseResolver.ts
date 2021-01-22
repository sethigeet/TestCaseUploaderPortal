import { FindConditions, LessThan } from "typeorm";
import { Arg, Int, Query, Resolver } from "type-graphql";

import { UserRoles } from "@portal/common";

import { isAuthenticated, CurrentUser } from "../../../shared/decorators";

import { User } from "../../../user/userEntity";

import { TestCase } from "../../testCaseEntity";
import { PaginatedTestCases } from "./responseTypes";

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

    const testCase = await TestCase.findOne(id, {
      relations: ["createdBy", "updatedBy"],
    });

    if (!testCase) {
      return undefined;
    }

    if (user.role === UserRoles.TESTER) {
      if (testCase.createdBy.id !== user.id) {
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

    let testCases: TestCase[];
    try {
      const where: FindConditions<TestCase> = {};
      if (user.role === UserRoles.TESTER) {
        where.createdBy = { id: user.id };
      }
      if (cursor) {
        where.createdAt = LessThan(new Date(parseInt(cursor)));
      }
      testCases = await TestCase.find({
        order: { createdAt: "DESC" },
        take: realLimitPlusOne,
        relations: ["createdBy", "updatedBy"],
        where,
      });
    } catch (e) {
      throw new Error(`An error occurred while fetching the results!, ${e}`);
    }

    return {
      testCases: testCases.slice(0, realLimit),
      hasMore: testCases.length === realLimitPlusOne ? true : false,
    };
  }
}
