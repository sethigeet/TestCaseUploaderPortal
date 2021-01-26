export const getGetTestingForQuery = (id: string): string => `
query {
  getTestingFor(id: "${id}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    menu {
      id
    }
  }
}
`;
