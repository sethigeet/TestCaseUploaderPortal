export const getDeleteModuleMutation = (id: string): string => `
mutation {
  deleteModule(id: "${id}")
}
`;
