import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

// Resolvers
import { userResolvers } from "../../user/userResolver";
import { testCaseResolvers } from "../../testCase/testCaseResolver";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers: any = [...userResolvers, ...testCaseResolvers];

export const createSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers,
    validate: false,
  });
};
