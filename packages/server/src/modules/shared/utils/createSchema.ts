import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

// Resolvers
import { userResolvers } from "../../user/userResolver";
import { testCaseResolvers } from "../../testCase/testCaseResolver";

const resolvers: any = [...userResolvers, ...testCaseResolvers];

export const createSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers,
    validate: false,
  });
};
