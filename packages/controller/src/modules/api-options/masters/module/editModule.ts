import { MutationFunctionOptions } from "@apollo/client";

import {
  EditModuleInput,
  EditModuleMutation,
  EditModuleMutationVariables,
  Exact,
} from "../../../api-hooks";

export const getEditModuleMutationOptions = ({
  id,
  input,
}: {
  id: string;
  input: EditModuleMutationVariables["input"];
}): MutationFunctionOptions<
  EditModuleMutation,
  Exact<{
    id: string;
    input: EditModuleInput;
  }>
> => ({
  variables: { id, input },
});
