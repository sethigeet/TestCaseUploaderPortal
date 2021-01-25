export const getLogoutMutation = (): string => `
mutation {
  logout 
}
`;

export const getLogoutAllSessionsMutation = (): string => `
mutation {
  logoutAllSessions
}
`;
