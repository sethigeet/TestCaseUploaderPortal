import { FormikErrors } from "formik";

import { FieldError } from "@portal/controller";

export const toFormikError = (errors: FieldError[]): FormikErrors<any> => {
  const errorMap: FormikErrors<any> = {};

  errors.forEach(({ field, message }) => (errorMap[field] = message));

  return errorMap;
};
