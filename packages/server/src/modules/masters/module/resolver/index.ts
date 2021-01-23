import { BuildSchemaOptions } from "type-graphql";

import { CreateModuleResolver } from "./create";
import { GetModuleResolver } from "./get";

export const moduleResolvers: BuildSchemaOptions["resolvers"] = [
  CreateModuleResolver,
  GetModuleResolver,
];
