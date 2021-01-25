export const getGetProductQuery = (id: string): string => `
query {
  getProduct(id: "${id}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
  }
}
`;
