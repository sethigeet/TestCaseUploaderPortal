import { MutationFunctionOptions } from "@apollo/client";

import {
  CreateMenuInput,
  CreateMenuMutation,
  CreateMenuMutationVariables,
  Exact,
} from "../../../api-hooks";

export const getCreateMenuMutationOptions = (
  input: CreateMenuMutationVariables["input"]
): MutationFunctionOptions<
  CreateMenuMutation,
  Exact<{
    input: CreateMenuInput;
  }>
> => ({
  variables: { input },
  update: (cache) => {
    cache.evict({ fieldName: "getMenus" });
  },
});
