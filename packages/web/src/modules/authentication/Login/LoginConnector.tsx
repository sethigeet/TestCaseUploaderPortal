import { FC } from "react";

import { FormikHelpers } from "formik";

import { LoginView } from "./View";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginConnector: FC = () => {
  const onSubmit: (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => void = (values) => console.log(values);

  return (
    <div>
      <LoginView onSubmit={onSubmit} />
    </div>
  );
};
