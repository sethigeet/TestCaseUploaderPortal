export const getGetTestCaseQuery = (id: string): string => `
query {
  getTestCase(id: "${id}") {
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
`;
