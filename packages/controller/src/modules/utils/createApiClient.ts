import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApiClient = (): ApolloClient<any> =>
  new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_URL as string,
    cache: new InMemoryCache(),
    credentials: "include",
  });
