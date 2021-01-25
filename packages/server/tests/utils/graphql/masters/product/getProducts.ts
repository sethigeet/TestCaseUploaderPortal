export const getGetProductsQuery = (): string => `
query {
  getProducts {
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
