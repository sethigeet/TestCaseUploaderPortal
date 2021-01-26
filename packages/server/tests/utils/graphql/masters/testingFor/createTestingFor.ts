import { CreateTestingForInput } from "../../../../../src/modules/masters/testingFor/resolver/create/inputTypes";

export const getCreateTestingForMutation = ({
  menuId,
  code,
  name,
  deprecated,
}: CreateTestingForInput): string => `
mutation {
  createTestingFor(
    input: {
      menuId: "${menuId}"
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
      menu {
        id
      }
    }
  }
}
`;
