import { TestTestCaseInput } from "../../../../src/modules/testCase/testCaseResolver/test/inputTypes";

export const getTestTestCaseMutation = ({
  id,
  passed,
  actualResult,
  userRemarks,
}: TestTestCaseInput): string => `
mutation {
  testTestCase(
    input: {
      id: "${id}"
      passed: ${passed}
      actualResult: "${actualResult}"
      userRemarks: "${userRemarks}"
    }
  ) {
    id
    passed
    actualResult
    userRemarks
  }
}
`;
