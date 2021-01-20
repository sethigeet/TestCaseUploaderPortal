import * as yup from "yup";

import { getRequiredMessage } from "../../errorMessages";

export const createTestCaseSchema = yup.object().shape({
  productCode: yup.string().required(getRequiredMessage("productCode")).max(15),
  moduleCode: yup.string().required(getRequiredMessage("moduleCode")).max(20),
  menuCode: yup.string().required(getRequiredMessage("menuCode")).max(15),
  testingFor: yup.string().required(getRequiredMessage("testingFor")).max(20),
  testingScope: yup
    .string()
    .required(getRequiredMessage("testingScope"))
    .max(255),
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
  productCode: yup.string().required(getRequiredMessage("productCode")).max(15),
  moduleCode: yup.string().required(getRequiredMessage("moduleCode")).max(20),
  menuCode: yup.string().required(getRequiredMessage("menuCode")).max(15),
  testingFor: yup.string().required(getRequiredMessage("testingFor")).max(20),
  testingScope: yup
    .string()
    .required(getRequiredMessage("testingScope"))
    .max(255),
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
