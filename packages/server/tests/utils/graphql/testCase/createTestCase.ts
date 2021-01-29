import { CreateTestCaseInput } from "../../../../src/modules/testCase/testCaseResolver/create/inputTypes";

export const getCreateTestCaseMutation = ({
  productId,
  moduleId,
  menuId,
  testingForId,
  testingScopeId,
  case: { description, expectedResult },
}: CreateTestCaseInput): string => `
mutation {
createTestCase(
    input: {
      productId: "${productId}"
      moduleId: "${moduleId}"
      menuId: "${menuId}"
      testingForId: "${testingForId}"
      testingScopeId: "${testingScopeId}"
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
