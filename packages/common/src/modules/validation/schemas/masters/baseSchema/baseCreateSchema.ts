import * as yup from "yup";
import { RequiredStringSchema } from "yup/lib/string";

import {
  getInvalidUuidMessage,
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "../../../errorMessages";

type BaseCreateSchema = {
  [key: string]:
    | RequiredStringSchema<string | undefined, Record<string, any>>
    | yup.BooleanSchema<
        boolean | undefined,
        Record<string, any>,
        boolean | undefined
      >;
};

export const getBaseCreateSchema = (parentName?: string): BaseCreateSchema => {
  const baseSchema: BaseCreateSchema = {};

  if (parentName) {
    baseSchema[`${parentName}Id`] = yup
      .string()
      .required(getRequiredMessage(`${parentName}Id`))
      .uuid(getInvalidUuidMessage(`${parentName}Id`));
  }

  baseSchema["code"] = yup
    .string()
    .required(getRequiredMessage("code"))
    .max(15, getMaxLenMessage("code", 15));

  baseSchema["name"] = yup
    .string()
    .required(getRequiredMessage("name"))
    .max(50);

  baseSchema["deprecated"] = yup.boolean();

  return baseSchema;
};
