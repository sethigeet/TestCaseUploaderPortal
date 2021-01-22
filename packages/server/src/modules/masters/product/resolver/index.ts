import { BuildSchemaOptions } from "type-graphql";

import { CreateProductResolver } from "./create";

export const productResolvers: BuildSchemaOptions["resolvers"] = [
  CreateProductResolver,
];
