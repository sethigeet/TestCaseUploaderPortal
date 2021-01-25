import { CreateTestCaseInput } from "../../../../src/modules/testCase/testCaseResolver/create/inputTypes";

export const getCreateTestCaseMutation = ({
  productCode,
  moduleCode,
  menuCode,
  testingFor,
  testingScope,
  case: { description, expectedResult },
}: CreateTestCaseInput): string => `
mutation {
createTestCase(
    input: {
      productCode: "${productCode}"
      moduleCode: "${moduleCode}"
      menuCode: "${menuCode}"
      testingFor: "${testingFor}"
      testingScope: "${testingScope}"
      case: {
        description: "${description}"
        expectedResult: "${expectedResult}"
      }
    }
  ) {
    errors {
      field
      message
    }
    testCase {
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
