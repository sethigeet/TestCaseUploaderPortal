export const getDeleteTestingScopeMutation = (id: string): string => `
mutation {
  deleteTestingScope(id: "${id}")
}
`;
