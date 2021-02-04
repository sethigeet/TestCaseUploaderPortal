import { FC } from "react";

import { GetProductQueryHookResult } from "@portal/controller";

import { Alert, AlertIcon, Box, Heading } from "@chakra-ui/react";

import { ErrorMessageType } from "../../../../../types";
import { formatTime } from "../../../../../utils";
import { Table, Wrapper } from "../../../../../components";

import { CHILD_MASTER_COLUMNS } from "../../../../base/ChildMasterColumns";

import { DeprecationIcon } from "./DeprecationIcon";

interface SingleProductViewViewProps {
  data?: GetProductQueryHookResult["data"];
  loading?: boolean;
  errorMessage?: ErrorMessageType;
}

export const ViewSingleProductView: FC<SingleProductViewViewProps> = ({
  data,
  loading,
  errorMessage,
}) => {
  return (
    <Wrapper loading={loading} errorMessage={errorMessage}>
      {data?.getProduct && (
        <Box>
          <Box my={15} display="flex">
            <Box>
              <Heading size="md" color="gray.500" mb={2}>
                {data.getProduct.code}
              </Heading>
              <Heading size="3xl">{data.getProduct.name}</Heading>
            </Box>
            <DeprecationIcon deprecated={data.getProduct.deprecated} ml={100} />
          </Box>
          <Box my={15}>
            <Heading fontSize="md" color="gray.600" as="span">
              Created by{" "}
              <Heading fontSize="md" color="black" as="span">
                {data.getProduct.createdBy.username}
              </Heading>{" "}
              <Heading fontSize="md" color="black" as="span">
                {formatTime(data.getProduct.createdAt)}
              </Heading>
            </Heading>
            {data.getProduct.updatedBy && (
              <Heading fontSize="md" color="gray.600" as="span" mt={5}>
                Updated by{" "}
                <Heading fontSize="md" color="black" as="span">
                  {data.getProduct.createdBy.username}
                </Heading>{" "}
                <Heading fontSize="md" color="black" as="span">
                  {formatTime(data.getProduct.createdAt)}
                </Heading>
              </Heading>
            )}
          </Box>
          <Box my={15} py={15} borderTopWidth={1} borderTopColor="gray.300">
            {data.getProduct.modules ? (
              data.getProduct.modules.length > 0 ? (
                <Table
                  columnProperties={CHILD_MASTER_COLUMNS}
                  data={data.getProduct.modules}
                  showLink
                  initialRoute="/masters/modules/"
                />
              ) : (
                <Alert status="info" borderRadius={15}>
                  <AlertIcon />
                  There are no modules in this product!
                </Alert>
              )
            ) : null}
          </Box>
        </Box>
      )}
    </Wrapper>
  );
};
