import { inspect } from "util";

import { CreateTestCasesInput } from "../../../../src/modules/testCase/testCaseResolver/create/inputTypes";

export const getCreateTestCasesMutation = ({
  productId,
  moduleId,
  menuId,
  testingForId,
  testingScopeId,
  cases,
}: CreateTestCasesInput): string => `
mutation {
createTestCases(
    input: {
      productId: "${productId}"
      moduleId: "${moduleId}"
      menuId: "${menuId}"
      testingForId: "${testingForId}"
      testingScopeId: "${testingScopeId}"
      cases: ${inspect(cases).replace(/'/g, '"')}
    }
  ) {
    errors {
      field
      message
    }
    testCases {
      id
      productId
      moduleId
      menuId
      testingForId
      testingScopeId
      description
      expectedResult
      createdBy {
        id
      }
    }
  }
}
`;
