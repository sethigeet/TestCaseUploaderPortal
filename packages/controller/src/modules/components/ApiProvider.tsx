import { FC } from "react";

import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "../utils";

const client = createApolloClient();

export const ApiProvider: FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
