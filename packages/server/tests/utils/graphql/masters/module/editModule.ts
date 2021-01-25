import { EditModuleInput } from "../../../../../src/modules/masters/module/resolver/create/inputTypes";

export const getEditModuleMutation = (
  id: string,
  { code, name, deprecated }: EditModuleInput
): string => `
mutation {
  editModule(
    id: "${id}"
    input: {
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    module {
      id
      code
      name
      deprecated
      createdBy {
        id
      }
      updatedBy {
        id
      }
      product {
        id
      }
    }
  }
}
`;
