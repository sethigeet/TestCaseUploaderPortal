import { FC, useState } from "react";

import { useGetModulesQuery, useGetProductsQuery } from "@portal/controller";

import { ViewAllModulesView } from "./View/ViewAllModulesView";

export const ViewAllModulesConnector: FC = () => {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(false);

  const {
    data: productsData,
    loading: getProductsLoading,
    error: getProductsError,
  } = useGetProductsQuery();
  const {
    data: getModulesData,
    loading: getModulesLoading,
    error: getModulesError,
  } = useGetModulesQuery({
    skip: productId === "",
    variables: { productId },
  });

  if (!error && (getProductsError || getModulesError)) {
    setError(true);
  }

  return (
    <div>
      <ViewAllModulesView
        products={productsData?.getProducts}
        data={getModulesData?.getModules}
        productId={productId}
        setProductId={setProductId}
        loading={getModulesLoading || getProductsLoading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the modules. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
