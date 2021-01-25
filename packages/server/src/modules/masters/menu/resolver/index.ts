import { BuildSchemaOptions } from "type-graphql";

import { CreateMenuResolver } from "./create";
import { DeleteMenuResolver } from "./delete";
import { GetMenuResolver } from "./get";

export const menuResolvers: BuildSchemaOptions["resolvers"] = [
  CreateMenuResolver,
  GetMenuResolver,
  DeleteMenuResolver,
];
