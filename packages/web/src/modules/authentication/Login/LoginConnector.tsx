import { FC, useState } from "react";

import { FormikHelpers } from "formik";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import {
  getLoginMutationOptions,
  useLoginMutation,
  useMeQuery,
} from "@portal/controller";

import { toFormikError } from "../../utils";

import { LoginView } from "./View";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginConnector: FC = () => {
  const history = useHistory();
  const location = useLocation<{ next?: string }>();

  const [error, setError] = useState(false);
  const [login, { error: loginError }] = useLoginMutation();
  const { data } = useMeQuery();

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

    if (location.state.next) {
      history.push(location.state.next);
    } else {
      history.push("/");
    }

    setSubmitting(false);
  };

  if (loginError && !error) {
    setError(true);
  }

  if (data?.me) {
    if (location.state.next) {
      return <Redirect to={location.state.next} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <div>
      <LoginView
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while loggin you in. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
