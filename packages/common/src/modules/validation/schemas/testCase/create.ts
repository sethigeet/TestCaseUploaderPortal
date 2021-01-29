import * as yup from "yup";

import { getRequiredMessage } from "../../errorMessages";

export const createTestCaseSchema = yup.object().shape({
  productId: yup.string().required(getRequiredMessage("productId")),
  moduleId: yup.string().required(getRequiredMessage("moduleId")),
  menuId: yup.string().required(getRequiredMessage("menuId")),
  testingForId: yup.string().required(getRequiredMessage("testingForId")),
  testingScopeId: yup.string().required(getRequiredMessage("testingScopeId")),
  case: yup
    .object({
      description: yup.string().required(getRequiredMessage("description")),
      expectedResult: yup
        .string()
        .required(getRequiredMessage("expectedResult")),
    })
    .required(getRequiredMessage("case")),
});

export const createTestCasesSchema = yup.object().shape({
  productId: yup.string().required(getRequiredMessage("productId")),
  moduleId: yup.string().required(getRequiredMessage("moduleId")),
  menuId: yup.string().required(getRequiredMessage("menuId")),
  testingForId: yup.string().required(getRequiredMessage("testingForId")),
  testingScopeId: yup.string().required(getRequiredMessage("testingScopeId")),
  cases: yup
    .array()
    .of(
      yup.object({
        description: yup.string().required(getRequiredMessage("description")),
        expectedResult: yup
          .string()
          .required(getRequiredMessage("expectedResult")),
      })
    )
    .required(getRequiredMessage("cases")),
});
