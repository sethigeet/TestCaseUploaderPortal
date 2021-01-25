export const getVerifyTestCaseMutation = (id: string): string => `
mutation {
  verifyTestCase(id: "${id}") 
}
`;
