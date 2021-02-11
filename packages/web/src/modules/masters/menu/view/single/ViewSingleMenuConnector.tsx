import { FC, useState } from "react";

import { useParams } from "react-router-dom";

import { useGetMenuQuery } from "@portal/controller";

import { ViewSingleMasterView } from "../../../base";

export const ViewSingleMenuConnector: FC = () => {
  const [error, setError] = useState(false);

  const { menuId } = useParams<{ menuId: string }>();
  const { data, loading, error: getMenuError } = useGetMenuQuery({
    variables: { id: menuId },
  });

  if (!error && getMenuError) {
    setError(true);
  }

  return (
    <div>
      <ViewSingleMasterView
        masterName="menu"
        childName="testingFor"
        data={data?.getMenu}
        loading={loading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the menu. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
