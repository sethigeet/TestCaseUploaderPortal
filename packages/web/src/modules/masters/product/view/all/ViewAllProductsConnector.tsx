import { FC, useState } from "react";

import { useGetProductsQuery } from "@portal/controller";

import { ViewAllMastersView } from "../../../base";

export const ViewAllProductsConnector: FC = () => {
  const [error, setError] = useState(false);

  const { data, loading, error: getProductsError } = useGetProductsQuery();

  if (!error && getProductsError) {
    setError(true);
  }

  return (
    <div>
      <ViewAllMastersView
        masterName="product"
        data={data?.getProducts}
        loading={loading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the products. Make sure that you are connected to the internet!",
              }
            : undefined
        }
        withWrapper
      />
    </div>
  );
};
