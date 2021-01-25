import * as yup from "yup";

import { getRequiredMessage } from "../../../errorMessages";

export const editTestingScopeSchema = yup.object().shape({
  code: yup.string().required(getRequiredMessage("code")).max(10),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
