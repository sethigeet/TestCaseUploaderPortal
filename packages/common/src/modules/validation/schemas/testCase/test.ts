import * as yup from "yup";

import { getInvalidUuidMessage, getRequiredMessage } from "../../errorMessages";

export const testTestCaseSchema = yup.object().shape({
  id: yup
    .string()
    .required(getRequiredMessage("id"))
    .uuid(getInvalidUuidMessage("id")),
  passed: yup.boolean().required(getRequiredMessage("passed")),
  actualResult: yup.string().required(getRequiredMessage("actualResult")),
  userRemarks: yup.string().required(getRequiredMessage("userRemarks")),
});
