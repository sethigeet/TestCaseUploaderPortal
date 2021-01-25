import * as yup from "yup";

import {
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "../../../errorMessages";

export const createModuleSchema = yup.object().shape({
  productId: yup
    .string()
    .required(getRequiredMessage("productId"))
    .min(36, getMinLenMessage("productId", 36))
    .max(36, getMaxLenMessage("productId", 36)),
  code: yup
    .string()
    .required(getRequiredMessage("code"))
    .max(15, getMaxLenMessage("code", 15)),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
