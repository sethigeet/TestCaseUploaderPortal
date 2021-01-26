export const getDeleteTestingForMutation = (id: string): string => `
mutation {
  deleteTestingFor(id: "${id}")
}
`;
