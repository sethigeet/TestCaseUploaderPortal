import { FC, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
  EditModuleInput,
  getEditModuleMutationOptions,
  useEditModuleMutation,
  useGetModuleQuery,
} from "@portal/controller";

import { FormOnSubmit } from "../../../types";
import { toFormikError } from "../../../utils";

import { EditModuleView } from "./View";

export type EditModuleFormOnSubmit = FormOnSubmit<EditModuleInput>;

export const EditModuleConnector: FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();

  const [error, setError] = useState(false);
  const { data, error: getModuleError, loading } = useGetModuleQuery({
    variables: { id: moduleId },
  });
  const [editModule, { error: editModuleError }] = useEditModuleMutation();
  const history = useHistory();

  const onSubmit: EditModuleFormOnSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    const res = await editModule(
      getEditModuleMutationOptions({ input: values, id: moduleId })
    );

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.editModule.errors) {
      setErrors(toFormikError(res.data?.editModule.errors));
      return;
    }

    history.push(`/masters/modules/${moduleId}`);

    setSubmitting(false);
  };

  if ((editModuleError || getModuleError) && !error) {
    setError(true);
  }
  if (!loading && !data?.getModule && !error) {
    setError(true);
  }

  return (
    <div>
      <EditModuleView
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while editing the module. Make sure that you are connected to the internet!",
              }
            : undefined
        }
        loading={loading}
        initialValues={
          data?.getModule
            ? {
                code: data?.getModule.code,
                name: data?.getModule.name,
                deprecated: data?.getModule.deprecated,
              }
            : undefined
        }
      />
    </div>
  );
};
