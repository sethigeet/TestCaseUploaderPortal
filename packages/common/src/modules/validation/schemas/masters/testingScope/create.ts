import * as yup from "yup";

import {
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "../../../errorMessages";

export const createTestingScopeSchema = yup.object().shape({
  testingForId: yup
    .string()
    .required(getRequiredMessage("testingForId"))
    .min(36, getMinLenMessage("testingForId", 36))
    .max(36, getMaxLenMessage("testingForId", 36)),
  code: yup.string().required(getRequiredMessage("code")).max(10),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
