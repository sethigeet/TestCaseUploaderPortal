import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = (): ApolloClient<any> =>
  new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });
