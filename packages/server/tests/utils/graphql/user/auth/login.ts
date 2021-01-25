export const getLoginMutation = (
  username: string,
  password: string
): string => `
mutation {
  login(credentials: {username: "${username}", password: "${password}"}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;
