import { Arg, Mutation, Resolver } from "type-graphql";

import { isAuthenticated, CurrentUser } from "../../../shared/decorators";

import { User } from "../../../user";

import { TestCase } from "../../testCaseEntity";
import { TestCaseHistory } from "../../testCaseHistoryEntity";

@Resolver(() => TestCase)
export class DeleteTestCaseResolver {
  @isAuthenticated()
  @Mutation(() => Boolean)
  async deleteTestCase(
    @Arg("id") id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    if (!id) {
      return false;
    }

    const testCase = await TestCase.findOne(id, {
      relations: ["createdBy"],
    });

    if (!testCase) {
      return false;
    }

    if (testCase.createdBy.id !== user.id) {
      throw new Error("Insufficient permissions!");
    }

    try {
      await TestCaseHistory.create({
        tsid: testCase.id,
        productCode: testCase.productCode,
        moduleCode: testCase.moduleCode,
        menuCode: testCase.menuCode,
        testingFor: testCase.testingFor,
        testingScope: testCase.testingScope,
        description: testCase.description,
        expectedResult: testCase.expectedResult,
        verified: testCase.verified,
        verifiedBy: testCase.verifiedBy,
        passed: testCase.passed,
        actualResult: testCase.actualResult,
        userRemarks: testCase.userRemarks,
        deletedAt: new Date(Date.now()),
        deletedBy: user,
      }).save();
      await testCase.remove();
    } catch (e) {
      return false;
    }

    return true;
  }
}
