import { EditTestingForInput } from "../../../../../src/modules/masters/testingFor/resolver/create/inputTypes";

export const getEditTestingForMutation = (
  id: string,
  { code, name, deprecated }: EditTestingForInput
): string => `
mutation {
  editTestingFor(
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
    testingFor {
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
      menu {
        id
      }
    }
  }
}
`;
