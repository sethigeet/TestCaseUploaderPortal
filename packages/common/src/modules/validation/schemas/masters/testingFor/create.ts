import * as yup from "yup";

import {
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "../../../errorMessages";

export const createTestingForSchema = yup.object().shape({
  menuId: yup
    .string()
    .required(getRequiredMessage("productId"))
    .min(36, getMinLenMessage("productId", 36))
    .max(36, getMaxLenMessage("productId", 36)),
  code: yup.string().required(getRequiredMessage("code")).max(10),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
