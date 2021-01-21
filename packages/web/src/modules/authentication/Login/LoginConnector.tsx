import { FC, useState } from "react";

import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { getLoginMutationOptions, useLoginMutation } from "@portal/controller";

import { toFormikError } from "../../utils";
import { displayErrorToast } from "../../components";

import { LoginView } from "./View";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginConnector: FC = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [login, { error: loginError }] = useLoginMutation();

  const onSubmit: (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => void = async (values, { setErrors, setSubmitting }) => {
    const res = await login(getLoginMutationOptions(values));

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.login.errors) {
      setErrors(toFormikError(res.data.login.errors));
      return;
    }

    history.push("/");

    setSubmitting(false);
  };

  if (loginError) {
    if (!error) {
      setError(true);
    }
  }

  if (error) {
    displayErrorToast({
      message:
        "There was an error while loggin you in. Make sure that you are connected to the internet!",
    });
  }

  return (
    <div>
      <LoginView onSubmit={onSubmit} />
    </div>
  );
};
