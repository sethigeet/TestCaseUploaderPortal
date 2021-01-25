import { EditMenuInput } from "../../../../../src/modules/masters/menu/resolver/create/inputTypes";

export const getEditMenuMutation = (
  id: string,
  { code, name, deprecated }: EditMenuInput
): string => `
mutation {
  editMenu(
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
    menu {
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
      module {
        id
      }
    }
  }
}
`;
