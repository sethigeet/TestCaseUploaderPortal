import { MutationFunctionOptions } from "@apollo/client";

import {
  Exact,
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
  MeDocument,
  MeQuery,
} from "../../../api-hooks";

export const getLoginMutationOptions = (
  credentials: LoginMutationVariables["credentials"]
): MutationFunctionOptions<
  LoginMutation,
  Exact<{
    credentials: LoginInput;
  }>
> => ({
  variables: { credentials },
  update: (cache, { data }) => {
    cache.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: data?.login.user,
      },
    });
  },
});
