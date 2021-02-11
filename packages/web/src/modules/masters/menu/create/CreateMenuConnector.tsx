import { FC, useState } from "react";

import { useHistory } from "react-router-dom";

import {
  CreateMenuInput,
  useCreateMenuMutation,
  useGetProductsQuery,
  getCreateMenuMutationOptions,
  useGetModulesQuery,
} from "@portal/controller";

import { FormOnSubmit } from "../../../types";
import { toFormikError } from "../../../utils";

import { CreateMenuView } from "./View";

export type CreateMenuFormOnSubmit = FormOnSubmit<CreateMenuInput>;

export const CreateMenuConnector: FC = () => {
  const history = useHistory();
  const [error, setError] = useState(false);

  const [productId, setProductId] = useState("");

  const {
    data: getProductsData,
    error: getProductsError,
    loading: getProductsLoading,
  } = useGetProductsQuery();
  const {
    data: getModulesData,
    error: getModulesError,
    loading: getModulesLoading,
  } = useGetModulesQuery({ skip: productId === "", variables: { productId } });
  const [createMenu, { error: createMenuError }] = useCreateMenuMutation();

  const onSubmit: CreateMenuFormOnSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    const res = await createMenu(getCreateMenuMutationOptions(values));

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.createMenu.errors) {
      setErrors(toFormikError(res.data?.createMenu.errors));
      return;
    }

    history.push("/masters/menus");

    setSubmitting(false);
  };

  if ((createMenuError || getProductsError || getModulesError) && !error) {
    setError(true);
  }

  return (
    <div>
      <CreateMenuView
        loading={getProductsLoading || getModulesLoading}
        products={getProductsData?.getProducts}
        modules={getModulesData?.getModules}
        productId={productId}
        setProductId={setProductId}
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while creating the menu. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
