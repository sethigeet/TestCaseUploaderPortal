export const getGetTestCasesQuery = (
  limit: number,
  cursor?: string
): string => `
query {
  getTestCases(limit: ${limit}${cursor ? `, cursor: "${cursor}"` : ""}) {
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
      createdAt
    }
    hasMore
  }
}
`;
