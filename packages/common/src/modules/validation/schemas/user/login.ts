import * as yup from "yup";

import { getRequiredMessage } from "../../errorMessages";

export const loginSchema = yup.object().shape({
  username: yup.string().required(getRequiredMessage("username")),
  password: yup.string().required(getRequiredMessage("password")),
});
