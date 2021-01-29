import * as yup from "yup";

import { getInvalidUuidMessage, getRequiredMessage } from "../../errorMessages";

export const editUntestedTestCaseSchema = yup.object().shape({
  id: yup
    .string()
    .required(getRequiredMessage("id"))
    .uuid(getInvalidUuidMessage("id")),
  description: yup.string().required(getRequiredMessage("description")),
  expectedResult: yup.string().required(getRequiredMessage("expectedResult")),
});

export const editTestedTestCaseSchema = yup.object().shape({
  id: yup
    .string()
    .required(getRequiredMessage("id"))
    .uuid(getInvalidUuidMessage("id")),
  actualResult: yup.string().required(getRequiredMessage("actualResult")),
  userRemarks: yup.string().required(getRequiredMessage("userRemarks")),
});
