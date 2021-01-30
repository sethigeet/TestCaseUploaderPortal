import { MutationFunctionOptions } from "@apollo/client";

import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  Exact,
} from "../../../api-hooks";

export const getCreateProductMutationOptions = (
  input: CreateProductMutationVariables["input"]
): MutationFunctionOptions<
  CreateProductMutation,
  Exact<{
    input: CreateProductInput;
  }>
> => ({
  variables: { input },
});
