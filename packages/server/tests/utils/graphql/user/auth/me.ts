export const getMeQuery = (): string => `
query {
  me {
    id
    username
  }
}
`;
