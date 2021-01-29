import * as yup from "yup";
import { UserRoles } from "../../../userRoles";

import {
  getMinLenMessage,
  getMustNotContainMessage,
  getRequiredMessage,
} from "../../errorMessages";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required(getRequiredMessage("username"))
    .min(3, getMinLenMessage("username"))
    .test(
      "Username should not include @ symbol",
      getMustNotContainMessage("Username", "@"),
      (value) => {
        if (value?.includes("@")) {
          return false;
        }
        return true;
      }
    ),
  password: yup
    .string()
    .required(getRequiredMessage("password"))
    .min(3, getMinLenMessage("password")),
  role: yup
    .string()
    .default(UserRoles.TESTER)
    .oneOf([UserRoles.TESTER, UserRoles.SUPERVISOR, UserRoles.ADMIN]),
});
