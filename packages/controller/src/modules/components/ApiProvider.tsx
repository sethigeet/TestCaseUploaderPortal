import { FC } from "react";

import { ApolloProvider } from "@apollo/client";

import { createApiClient } from "../utils";

const client = createApiClient();

export const ApiProvider: FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
