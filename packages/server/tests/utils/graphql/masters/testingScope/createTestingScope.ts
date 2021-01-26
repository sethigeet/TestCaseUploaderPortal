import { CreateTestingScopeInput } from "../../../../../src/modules/masters/testingScope/resolver/create/inputTypes";

export const getCreateTestingScopeMutation = ({
  testingForId,
  code,
  name,
  deprecated,
}: CreateTestingScopeInput): string => `
mutation {
  createTestingScope(
    input: {
      testingForId: "${testingForId}"
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
      testingFor {
        id
      }
    }
  }
}
`;
