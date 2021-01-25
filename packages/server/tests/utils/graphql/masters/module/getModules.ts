export const getGetModulesQuery = (productId: string): string => `
query {
  getModules(productId: "${productId}") {
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
