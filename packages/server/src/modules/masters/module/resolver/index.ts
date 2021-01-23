import { BuildSchemaOptions } from "type-graphql";

import { CreateModuleResolver } from "./create";
import { DeleteModuleResolver } from "./delete";
import { GetModuleResolver } from "./get";

export const moduleResolvers: BuildSchemaOptions["resolvers"] = [
  CreateModuleResolver,
  GetModuleResolver,
  DeleteModuleResolver,
];
