import { FC, useState } from "react";

import { useGetProductsQuery } from "@portal/controller";

import { ViewAllMastersView } from "../../../base";

export const ViewAllModulesConnector: FC = () => {
  const [error, setError] = useState(false);

  const { data, loading, error: getProductsError } = useGetProductsQuery();

  if (!error && getProductsError) {
    setError(true);
  }

  return (
    <div>
      <ViewAllMastersView
        masterName="module"
        data={data?.getProducts}
        loading={loading}
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
