import { BuildSchemaOptions } from "type-graphql";

import { CreateTestingScopeResolver } from "./create";
import { DeleteTestingScopeResolver } from "./delete";
import { GetTestingScopeResolver } from "./get";

export const testingScopeResolvers: BuildSchemaOptions["resolvers"] = [
  CreateTestingScopeResolver,
  GetTestingScopeResolver,
  DeleteTestingScopeResolver,
];
