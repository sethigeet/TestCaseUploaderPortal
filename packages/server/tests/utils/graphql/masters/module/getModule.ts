export const getGetModuleQuery = (id: string): string => `
query {
  getModule(id: "${id}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    product {
      id
    }
  }
}
`;
