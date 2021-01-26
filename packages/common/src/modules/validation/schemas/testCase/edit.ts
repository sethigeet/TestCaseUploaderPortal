import * as yup from "yup";

import { getRequiredMessage } from "../../errorMessages";

export const editUntestedTestCaseSchema = yup.object().shape({
  id: yup.string().required(getRequiredMessage("id")),
  description: yup.string().required(getRequiredMessage("description")),
  expectedResult: yup.string().required(getRequiredMessage("expectedResult")),
});

export const editTestedTestCaseSchema = yup.object().shape({
  id: yup.string().required(getRequiredMessage("id")),
  actualResult: yup.string().required(getRequiredMessage("actualResult")),
  userRemarks: yup.string().required(getRequiredMessage("userRemarks")),
});
