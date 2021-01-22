import { BuildSchemaOptions } from "type-graphql";

import { CreateProductResolver } from "./create";
import { GetProductResolver } from "./get";

export const productResolvers: BuildSchemaOptions["resolvers"] = [
  CreateProductResolver,
  GetProductResolver,
];
