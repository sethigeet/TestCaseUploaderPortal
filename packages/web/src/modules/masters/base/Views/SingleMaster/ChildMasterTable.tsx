import { FC } from "react";

import { Alert, AlertIcon, Box } from "@chakra-ui/react";

import { GetProductQuery } from "@portal/controller";

import { Table } from "../../../../components";

import { CHILD_MASTER_COLUMNS } from "../../ChildMasterColumns";

interface ChildMasterTableProps {
  masterName: string;
  childName: string;
  data?: GetProductQuery["getProduct"];
}

export const ChildMasterTable: FC<ChildMasterTableProps> = ({
  masterName,
  childName,
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <Box my={15} py={15} borderTopWidth={1} borderTopColor="gray.300">
      {data.modules ? (
        data.modules.length > 0 ? (
          <Table
            columnProperties={CHILD_MASTER_COLUMNS}
            data={data.modules}
            showLink
            initialRoute="/masters/modules/"
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
