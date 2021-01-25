export const getGetMenuQuery = (id: string): string => `
query {
  getMenu(id: "${id}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    module {
      id
    }
  }
}
`;
