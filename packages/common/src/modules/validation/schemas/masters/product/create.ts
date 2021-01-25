import * as yup from "yup";

import { getMaxLenMessage, getRequiredMessage } from "../../../errorMessages";

export const createProductSchema = yup.object().shape({
  code: yup
    .string()
    .required(getRequiredMessage("code"))
    .max(15, getMaxLenMessage("code", 15)),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
