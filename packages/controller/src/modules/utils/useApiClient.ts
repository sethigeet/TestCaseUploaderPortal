import { ApolloClient, useApolloClient } from "@apollo/client";

export const useApiClient = (): ApolloClient<any> => useApolloClient();
