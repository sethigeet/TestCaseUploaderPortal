import { CreateModuleInput } from "../../../../../src/modules/masters/module/resolver/create/inputTypes";

export const getCreateModuleMutation = ({
  productId,
  code,
  name,
  deprecated,
}: CreateModuleInput): string => `
mutation {
  createModule(
    input: {
      productId: "${productId}"
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    module {
      id
      code
      name
      deprecated
      createdBy {
        id
      }
      product {
        id
      }
    }
  }
}
`;
