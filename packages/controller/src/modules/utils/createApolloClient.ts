import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = (): ApolloClient<any> =>
  new ApolloClient({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000/graphql"
        : (process.env.BACKEND_URL as string),
    cache: new InMemoryCache(),
    credentials: "include",
  });
