import { CreateMenuInput } from "../../../../../src/modules/masters/menu/resolver/create/inputTypes";

export const getCreateMenuMutation = ({
  moduleId,
  code,
  name,
  deprecated,
}: CreateMenuInput): string => `
mutation {
  createMenu(
    input: {
      moduleId: "${moduleId}"
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
      module {
        id
      }
    }
  }
}
`;
