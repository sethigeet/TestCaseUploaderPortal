import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductQuery } from "@portal/controller";

import { ViewSingleProductView } from "./View";

export const ViewSingleProductConnector: FC = () => {
  const [error, setError] = useState(false);

  const { productId } = useParams<{ productId: string }>();
  const { data, loading, error: getProductError } = useGetProductQuery({
    variables: { id: productId },
  });

  if (!error && getProductError) {
    setError(true);
  }

  return (
    <div>
      <ViewSingleProductView
        data={data}
        loading={loading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the product. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
