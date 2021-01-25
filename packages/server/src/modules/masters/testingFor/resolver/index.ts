import { BuildSchemaOptions } from "type-graphql";

import { CreateTestingForResolver } from "./create";
import { DeleteTestingForResolver } from "./delete";
import { GetTestingForResolver } from "./get";

export const testingForResolvers: BuildSchemaOptions["resolvers"] = [
  CreateTestingForResolver,
  GetTestingForResolver,
  DeleteTestingForResolver,
];
