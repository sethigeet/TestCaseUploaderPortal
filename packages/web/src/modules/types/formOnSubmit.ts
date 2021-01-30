import { FormikHelpers } from "formik";

export type FormOnSubmit<T> = (
  values: T,
  formikHelpers: FormikHelpers<T>
) => void;
