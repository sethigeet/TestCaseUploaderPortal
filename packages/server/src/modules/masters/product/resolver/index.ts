import { BuildSchemaOptions } from "type-graphql";

import { CreateProductResolver } from "./create";
import { DeleteProductResolver } from "./delete";
import { GetProductResolver } from "./get";

export const productResolvers: BuildSchemaOptions["resolvers"] = [
  CreateProductResolver,
  GetProductResolver,
  DeleteProductResolver,
];
