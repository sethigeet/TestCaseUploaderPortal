import { CreateProductInput } from "../../../../../src/modules/masters/product/resolver/create/inputTypes";

export const getEditProductMutation = (
  id: string,
  { code, name, deprecated }: CreateProductInput
): string => `
mutation {
  editProduct(
    id: "${id}"
    input: {
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    product {
      id
      code
      name
      deprecated
      updatedBy {
        id
      }
      modules {
        id
      }
    }
  }
}
`;
