import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

// Resolvers
import { mastersResolvers } from "../../masters";

const resolvers: any = [
  ...userResolvers,
  ...testCaseResolvers,
  ...mastersResolvers,
];

export const createSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers,
    validate: false,
  });
};
