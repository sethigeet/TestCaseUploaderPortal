export const getDeleteProductMutation = (id: string): string => `
mutation {
  deleteProduct(id: "${id}")
}
`;
