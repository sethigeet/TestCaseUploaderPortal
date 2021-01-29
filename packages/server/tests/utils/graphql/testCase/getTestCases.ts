export const getGetTestCasesQuery = (
  limit: number,
  cursor?: string
): string => `
query {
  getTestCases(limit: ${limit}${cursor ? `, cursor: "${cursor}"` : ""}) {
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
      createdAt
    }
    hasMore
  }
}
`;
