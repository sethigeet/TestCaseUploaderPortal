export const getRegisterMutation = (
  username: string,
  password: string
): string => `
mutation {
  register(credentials: {username: "${username}", password: "${password}"}) {
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
