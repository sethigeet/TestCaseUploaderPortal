export const getGetTestingScopeQuery = (id: string): string => `
query {
  getTestingScope(id: "${id}") {
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
