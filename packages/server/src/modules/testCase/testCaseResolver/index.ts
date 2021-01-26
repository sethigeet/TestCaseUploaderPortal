import { BuildSchemaOptions } from "type-graphql";

import { CreateTestCaseResolver } from "./create";
import { DeleteTestCaseResolver } from "./delete";
import { EditTestCaseResolver } from "./edit";
import { GetTestCaseResolver } from "./get";
import { TestTestCaseResolver } from "./test";
import { VerifyTestCaseResolver } from "./verify";

export const testCaseResolvers: BuildSchemaOptions["resolvers"] = [
  CreateTestCaseResolver,
  GetTestCaseResolver,
  VerifyTestCaseResolver,
  TestTestCaseResolver,
  DeleteTestCaseResolver,
  EditTestCaseResolver,
];
