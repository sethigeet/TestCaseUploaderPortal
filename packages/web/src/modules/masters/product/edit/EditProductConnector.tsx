import { FC, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
  CreateProductInput,
  getEditProductMutationOptions,
  useEditProductMutation,
  useGetProductQuery,
} from "@portal/controller";

import { FormOnSubmit } from "../../../types";
import { toFormikError } from "../../../utils";

import { EditProductView } from "./View";

export type EditProductFormOnSubmit = FormOnSubmit<CreateProductInput>;

export const EditProductConnector: FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [error, setError] = useState(false);
  const { data, error: getProductError, loading } = useGetProductQuery({
    variables: { id: productId },
  });
  const [editProduct, { error: editProductError }] = useEditProductMutation();
  const history = useHistory();

  const onSubmit: EditProductFormOnSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    const res = await editProduct(
      getEditProductMutationOptions({ input: values, id: productId })
    );

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.editProduct.errors) {
      setErrors(toFormikError(res.data.editProduct.errors));
      return;
    }

    history.push(`/masters/products/${productId}`);

    setSubmitting(false);
  };

  if ((editProductError || getProductError) && !error) {
    setError(true);
  }
  if (!loading && !data?.getProduct && !error) {
    setError(true);
  }

  return (
    <div>
      <EditProductView
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while editing the product. Make sure that you are connected to the internet!",
              }
            : undefined
        }
        loading={loading}
        initialValues={
          data?.getProduct
            ? {
                code: data.getProduct.code,
                name: data.getProduct.name,
                deprecated: data.getProduct.deprecated,
              }
            : undefined
        }
      />
    </div>
  );
};
