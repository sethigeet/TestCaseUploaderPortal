import { MutationFunctionOptions } from "@apollo/client";

import {
  CreateModuleInput,
  CreateModuleMutation,
  CreateModuleMutationVariables,
  Exact,
} from "../../../api-hooks";

export const getCreateModuleMutationOptions = (
  input: CreateModuleMutationVariables["input"]
): MutationFunctionOptions<
  CreateModuleMutation,
  Exact<{
    input: CreateModuleInput;
  }>
> => ({
  variables: { input },
  update: (cache) => {
    cache.evict({ fieldName: "getModules" });
  },
});
