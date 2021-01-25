import { CreateProductInput } from "../../../../../src/modules/masters/product/resolver/create/inputTypes";

export const getCreateProductMutation = ({
  code,
  name,
  deprecated,
}: CreateProductInput): string => `
mutation {
  createProduct(
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
      createdBy {
        id
      }
      modules {
        id
      }
    }
  }
}
`;
