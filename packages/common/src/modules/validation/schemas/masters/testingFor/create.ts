import * as yup from "yup";

import {
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "../../../errorMessages";

export const createTestingForSchema = yup.object().shape({
  menuId: yup
    .string()
    .required(getRequiredMessage("menuId"))
    .min(36, getMinLenMessage("menuId", 36))
    .max(36, getMaxLenMessage("menuId", 36)),
  code: yup
    .string()
    .required(getRequiredMessage("code"))
    .max(15, getMaxLenMessage("code", 15)),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
