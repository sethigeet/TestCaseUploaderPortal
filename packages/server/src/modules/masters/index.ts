import { BuildSchemaOptions } from "type-graphql";

import { productResolvers } from "./product";

export const mastersResolvers: BuildSchemaOptions["resolvers"] = [
  ...productResolvers,
];
