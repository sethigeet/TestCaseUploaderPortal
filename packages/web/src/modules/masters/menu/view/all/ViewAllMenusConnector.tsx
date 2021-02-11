import { FC, useState } from "react";

import {
  useGetMenusQuery,
  useGetModulesQuery,
  useGetProductsQuery,
} from "@portal/controller";

import { ViewAllMenusView } from "./View/ViewAllMenusView";

export const ViewAllMenusConnector: FC = () => {
  const [productId, setProductId] = useState("");
  const [moduleId, setModuleId] = useState("");
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
  const {
    data: getMenusData,
    loading: getMenusLoading,
    error: getMenusError,
  } = useGetMenusQuery({
    skip: moduleId === "",
    variables: { moduleId },
  });

  if (!error && (getProductsError || getModulesError || getMenusError)) {
    setError(true);
  }

  return (
    <div>
      <ViewAllMenusView
        products={productsData?.getProducts}
        modules={getModulesData?.getModules}
        data={getMenusData?.getMenus}
        productId={productId}
        setProductId={setProductId}
        moduleId={moduleId}
        setModuleId={setModuleId}
        loading={getModulesLoading || getProductsLoading || getMenusLoading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the menus. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
