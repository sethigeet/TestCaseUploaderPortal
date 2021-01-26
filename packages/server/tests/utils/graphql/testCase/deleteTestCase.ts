export const getDeleteTestCaseMutation = (id: string): string => `
mutation {
  deleteTestCase(id: "${id}") 
}
`;
