import { MutationFunctionOptions } from "@apollo/client";

import {
  CreateProductInput,
  EditProductMutation,
  EditProductMutationVariables,
  Exact,
} from "../../../api-hooks";

export const getEditProductMutationOptions = ({
  id,
  input,
}: {
  id: string;
  input: EditProductMutationVariables["input"];
}): MutationFunctionOptions<
  EditProductMutation,
  Exact<{
    id: string;
    input: CreateProductInput;
  }>
> => ({
  variables: { id, input },
});
