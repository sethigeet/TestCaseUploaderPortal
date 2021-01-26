import { Arg, Query, Resolver } from "type-graphql";

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
    return TestingScopeMaster.find({
      where: { testingFor: { id: testingForId } },
      relations: ["createdBy", "updatedBy", "testingFor"],
      order: { createdAt: "DESC" },
    });
  }
}
