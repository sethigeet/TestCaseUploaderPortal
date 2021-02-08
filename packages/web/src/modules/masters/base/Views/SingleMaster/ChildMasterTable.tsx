import { FC } from "react";

import { Alert, AlertIcon, Box } from "@chakra-ui/react";

import { Master } from "../../../../utils";
import { Table } from "../../../../components";

import { CHILD_MASTER_COLUMNS } from "../../ChildMasterColumns";

import { getChildMasterData } from "./getChildMasterData";

interface ChildMasterTableProps {
  masterName: string;
  childName: string;
  data?: Master;
}

export const ChildMasterTable: FC<ChildMasterTableProps> = ({
  masterName,
  childName,
  data,
}) => {
  if (!data) {
    return null;
  }

  const childMasterData = getChildMasterData(data);

  return (
    <Box my={15} py={15} borderTopWidth={1} borderTopColor="gray.300">
      {childMasterData ? (
        childMasterData.length > 0 ? (
          <Table
            columnProperties={CHILD_MASTER_COLUMNS}
            data={childMasterData}
            showLink
            initialRoute={`/masters/${childName}s`}
          />
        ) : (
          <Alert status="info" borderRadius={15}>
            <AlertIcon />
            There are no {childName}s in this {masterName}!
          </Alert>
        )
      ) : null}
    </Box>
  );
};
