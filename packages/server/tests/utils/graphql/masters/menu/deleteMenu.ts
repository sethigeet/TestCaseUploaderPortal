export const getDeleteMenuMutation = (id: string): string => `
mutation {
  deleteMenu(id: "${id}")
}
`;
