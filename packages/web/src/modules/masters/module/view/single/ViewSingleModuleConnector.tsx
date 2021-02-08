import { FC, useState } from "react";

import { useParams } from "react-router-dom";

import { useGetModuleQuery } from "@portal/controller";

import { ViewSingleMasterView } from "../../../base";

export const ViewSingleModuleConnector: FC = () => {
  const [error, setError] = useState(false);

  const { moduleId } = useParams<{ moduleId: string }>();
  const { data, loading, error: getModuleError } = useGetModuleQuery({
    variables: { id: moduleId },
  });

  if (!error && getModuleError) {
    setError(true);
  }

  return (
    <div>
      <ViewSingleMasterView
        masterName="module"
        childName="menu"
        data={data?.getModule}
        loading={loading}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while fetching the module. Make sure that you are connected to the internet!",
              }
            : undefined
        }
      />
    </div>
  );
};
