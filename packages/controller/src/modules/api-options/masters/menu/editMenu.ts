import { MutationFunctionOptions } from "@apollo/client";

import {
  EditMenuInput,
  EditMenuMutation,
  EditMenuMutationVariables,
  Exact,
} from "../../../api-hooks";

export const getEditMenuMutationOptions = ({
  id,
  input,
}: {
  id: string;
  input: EditMenuMutationVariables["input"];
}): MutationFunctionOptions<
  EditMenuMutation,
  Exact<{
    id: string;
    input: EditMenuInput;
  }>
> => ({
  variables: { id, input },
});
