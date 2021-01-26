import { EditTestingScopeInput } from "../../../../../src/modules/masters/testingScope/resolver/create/inputTypes";

export const getEditTestingScopeMutation = (
  id: string,
  { code, name, deprecated }: EditTestingScopeInput
): string => `
mutation {
  editTestingScope(
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
    testingScope {
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
      testingFor {
        id
      }
    }
  }
}
`;
