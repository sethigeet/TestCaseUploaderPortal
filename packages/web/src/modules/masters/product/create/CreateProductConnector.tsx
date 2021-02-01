import { FC, useState } from "react";

import { useHistory } from "react-router-dom";

import {
  CreateProductInput,
  getCreateProductMutationOptions,
  useCreateProductMutation,
} from "@portal/controller";

import { FormOnSubmit } from "../../../types";
import { toFormikError } from "../../../utils";

import { CreateProductView } from "./View";

export type CreateProductFormOnSubmit = FormOnSubmit<CreateProductInput>;

export const CreateProductConnector: FC = () => {
  const [error, setError] = useState(false);
  const [
    createProduct,
    { error: createProductError },
  ] = useCreateProductMutation();
  const history = useHistory();

  const onSubmit: CreateProductFormOnSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    const res = await createProduct(getCreateProductMutationOptions(values));

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.createProduct.errors) {
      setErrors(toFormikError(res.data.createProduct.errors));
      return;
    }

    history.push("/masters/products");

    setSubmitting(false);
  };

  if (createProductError && !error) {
    setError(true);
  }

  return (
    <div>
      <CreateProductView
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while creating the product. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
