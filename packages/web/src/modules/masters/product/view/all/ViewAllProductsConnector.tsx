import { useGetProductsQuery } from "@portal/controller";
import { FC, useState } from "react";

import { ViewAllProductsView } from "./View";

export const ViewAllProductsConnector: FC = () => {
  const [error, setError] = useState(false);

  const { data, loading, error: getProductsError } = useGetProductsQuery();

  if (!error && getProductsError) {
    setError(true);
  }

  return (
    <div>
      <ViewAllProductsView
        data={data}
        loading={loading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the products. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
