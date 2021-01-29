import { Arg, Query, Resolver } from "type-graphql";
import { validate } from "uuid";

import { isAuthenticated } from "../../../../shared/decorators";

import { TestingScopeMaster } from "../../testingScopeMasterEntity";

@Resolver(() => TestingScopeMaster)
export class GetTestingScopeResolver {
  @isAuthenticated()
  @Query(() => TestingScopeMaster, { nullable: true })
  getTestingScope(
    @Arg("id") id: string
  ): Promise<TestingScopeMaster | undefined> {
    if (!id) {
      throw new Error("Id is required!");
    }

    if (!validate(id)) {
      throw new Error("Id must be a valid uuid!");
    }

    return TestingScopeMaster.findOne(id, {
      relations: ["createdBy", "updatedBy", "testingFor"],
    });
  }

  @isAuthenticated()
  @Query(() => [TestingScopeMaster])
  getTestingScopes(
    @Arg("testingForId") testingForId: string
  ): Promise<TestingScopeMaster[]> {
    if (!testingForId) {
      throw new Error("testingForId is required!");
    }

    if (!validate(testingForId)) {
      throw new Error("testingForId must be a valid uuid!");
    }

    return TestingScopeMaster.find({
      where: { testingFor: { id: testingForId } },
      relations: ["createdBy", "updatedBy", "testingFor"],
      order: { createdAt: "DESC" },
    });
  }
}
