import * as yup from "yup";
import { RequiredStringSchema } from "yup/lib/string";

import { getMaxLenMessage, getRequiredMessage } from "../../../errorMessages";

type BaseEditSchema = {
  [key: string]:
    | RequiredStringSchema<string | undefined, Record<string, any>>
    | yup.BooleanSchema<
        boolean | undefined,
        Record<string, any>,
        boolean | undefined
      >;
};

export const getBaseEditSchema = (): BaseEditSchema => {
  const baseSchema: BaseEditSchema = {
    code: yup
      .string()
      .required(getRequiredMessage("code"))
      .max(15, getMaxLenMessage("code", 15)),
    name: yup.string().required(getRequiredMessage("name")).max(50),
    deprecated: yup.boolean(),
  };

  return baseSchema;
};
