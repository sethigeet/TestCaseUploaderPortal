export const getGetTestingForsQuery = (menuId: string): string => `
query {
  getTestingFors(menuId: "${menuId}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    menu {
      id
    }
  }
}
`;
