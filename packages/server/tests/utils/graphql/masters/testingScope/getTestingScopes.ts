export const getGetTestingScopesQuery = (testingForId: string): string => `
query {
  getTestingScopes(testingForId: "${testingForId}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    testingFor {
      id
    }
  }
}
`;
