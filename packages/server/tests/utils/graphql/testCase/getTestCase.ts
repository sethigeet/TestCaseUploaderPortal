export const getGetTestCaseQuery = (id: string): string => `
query {
  getTestCase(id: "${id}") {
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
`;
