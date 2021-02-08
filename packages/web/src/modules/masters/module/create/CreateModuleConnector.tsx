import { FC, useState } from "react";

import { useHistory } from "react-router-dom";

import {
  CreateModuleInput,
  getCreateModuleMutationOptions,
  useCreateModuleMutation,
  useGetProductsQuery,
} from "@portal/controller";

import { FormOnSubmit } from "../../../types";
import { toFormikError } from "../../../utils";

import { CreateModuleView } from "./View";

export type CreateModuleFormOnSubmit = FormOnSubmit<CreateModuleInput>;

export const CreateModuleConnector: FC = () => {
  const [error, setError] = useState(false);
  const {
    data: getProductsData,
    error: getProductsError,
    loading,
  } = useGetProductsQuery();
  const [
    createModule,
    { error: createModuleError },
  ] = useCreateModuleMutation();
  const history = useHistory();

  const onSubmit: CreateModuleFormOnSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    const res = await createModule(getCreateModuleMutationOptions(values));

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.createModule.errors) {
      setErrors(toFormikError(res.data.createModule.errors));
      return;
    }

    history.push("/masters/modules");

    setSubmitting(false);
  };

  if (createModuleError && !error) {
    setError(true);
  }

  if (getProductsError && !error) {
    setError(true);
  }

  return (
    <div>
      <CreateModuleView
        loading={loading}
        products={getProductsData?.getProducts}
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while creating the module. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
