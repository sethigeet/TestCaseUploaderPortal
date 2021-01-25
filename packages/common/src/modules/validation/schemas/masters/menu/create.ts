import * as yup from "yup";

import {
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "../../../errorMessages";

export const createMenuSchema = yup.object().shape({
  moduleId: yup
    .string()
    .required(getRequiredMessage("moduleId"))
    .min(36, getMinLenMessage("moduleId", 36))
    .max(36, getMaxLenMessage("moduleId", 36)),
  code: yup
    .string()
    .required(getRequiredMessage("code"))
    .max(15, getMaxLenMessage("code", 15)),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
