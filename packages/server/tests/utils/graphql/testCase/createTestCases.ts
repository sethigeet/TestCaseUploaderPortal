import { inspect } from "util";

import { CreateTestCasesInput } from "../../../../src/modules/testCase/testCaseResolver/create/inputTypes";

export const getCreateTestCasesMutation = ({
  productCode,
  moduleCode,
  menuCode,
  testingFor,
  testingScope,
  cases,
}: CreateTestCasesInput): string => `
mutation {
createTestCases(
    input: {
      productCode: "${productCode}"
      moduleCode: "${moduleCode}"
      menuCode: "${menuCode}"
      testingFor: "${testingFor}"
      testingScope: "${testingScope}"
      cases: ${inspect(cases).replace(/'/g, '"')}
    }
  ) {
    errors {
      field
      message
    }
    testCases {
      id
      productCode
      moduleCode
      menuCode
      testingFor
      testingScope
      description
      expectedResult
      createdBy {
        id
      }
    }
  }
}
`;
