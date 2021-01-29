import { EditUntestedTestCaseInput } from "../../../../src/modules/testCase/testCaseResolver/edit/inputTypes";

export const getEditUntestedTestCaseMutation = ({
  id,
  description,
  expectedResult,
}: EditUntestedTestCaseInput): string => `
mutation {
editUntestedTestCase(
    input: {
      id: "${id}"
      description: "${description}"
      expectedResult: "${expectedResult}"
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
      updatedBy {
        id
      }
    }
  }
}
`;
