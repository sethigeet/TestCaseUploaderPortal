import { EditTestedTestCaseInput } from "../../../../src/modules/testCase/testCaseResolver/edit/inputTypes";

export const getEditTestedTestCaseMutation = ({
  id,
  actualResult,
  userRemarks,
}: EditTestedTestCaseInput): string => `
mutation {
editTestedTestCase(
    input: {
      id: "${id}"
      actualResult: "${actualResult}"
      userRemarks: "${userRemarks}"
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
