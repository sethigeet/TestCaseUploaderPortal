import * as yup from "yup";

import { getInvalidUuidMessage, getRequiredMessage } from "../../errorMessages";

export const createTestCaseSchema = yup.object().shape({
  productId: yup
    .string()
    .required(getRequiredMessage("productId"))
    .uuid(getInvalidUuidMessage("productId")),
  moduleId: yup
    .string()
    .required(getRequiredMessage("moduleId"))
    .uuid(getInvalidUuidMessage("moduleId")),
  menuId: yup
    .string()
    .required(getRequiredMessage("menuId"))
    .uuid(getInvalidUuidMessage("menuId")),
  testingForId: yup
    .string()
    .required(getRequiredMessage("testingForId"))
    .uuid(getInvalidUuidMessage("testingForId")),
  testingScopeId: yup
    .string()
    .required(getRequiredMessage("testingScopeId"))
    .uuid(getInvalidUuidMessage("testingScopeId")),
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
  productId: yup
    .string()
    .required(getRequiredMessage("productId"))
    .uuid(getInvalidUuidMessage("productId")),
  moduleId: yup
    .string()
    .required(getRequiredMessage("moduleId"))
    .uuid(getInvalidUuidMessage("moduleId")),
  menuId: yup
    .string()
    .required(getRequiredMessage("menuId"))
    .uuid(getInvalidUuidMessage("menuId")),
  testingForId: yup
    .string()
    .required(getRequiredMessage("testingForId"))
    .uuid(getInvalidUuidMessage("testingForId")),
  testingScopeId: yup
    .string()
    .required(getRequiredMessage("testingScopeId"))
    .uuid(getInvalidUuidMessage("testingScopeId")),
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
