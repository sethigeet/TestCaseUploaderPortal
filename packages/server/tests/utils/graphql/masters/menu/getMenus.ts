export const getGetMenusQuery = (moduleId: string): string => `
query {
  getMenus(moduleId: "${moduleId}") {
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
