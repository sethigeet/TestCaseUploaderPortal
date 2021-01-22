import * as yup from "yup";

import { getRequiredMessage } from "../../../errorMessages";

export const createProductSchema = yup.object().shape({
  id: yup.string().required(getRequiredMessage("id")).max(10),
  name: yup.string().required(getRequiredMessage("name")).max(50),
  deprecated: yup.boolean(),
});
