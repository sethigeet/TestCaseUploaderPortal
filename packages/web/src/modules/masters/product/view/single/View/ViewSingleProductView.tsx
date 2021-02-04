import { FC } from "react";

import { Link } from "react-router-dom";

import { GetProductQueryHookResult } from "@portal/controller";

import { Alert, AlertIcon, Box, Button, Heading } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

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
        <Box p={25}>
          <Box my={15} display="flex">
            <Box>
              <Heading size="md" color="gray.500" mb={2}>
                {data.getProduct.code}
              </Heading>
              <Heading size="3xl">{data.getProduct.name}</Heading>
            </Box>
            <DeprecationIcon deprecated={data.getProduct.deprecated} ml={100} />
            <Button
              as={Link}
              to={`/masters/products/${data.getProduct.id}/edit`}
              ml={2}
              h={10}
              w={10}
            >
              <EditIcon w={5} h={5} />
            </Button>
          </Box>
          <Box my={15}>
            <Heading fontSize="md" color="gray.600">
              Created by{" "}
              <Heading fontSize="md" color="black" as="span">
                {data.getProduct.createdBy.username}
              </Heading>{" "}
              <Heading fontSize="md" color="black" as="span">
                {formatTime(data.getProduct.createdAt)}
              </Heading>
            </Heading>
            {data.getProduct.updatedBy && data.getProduct.updatedAt && (
              <Heading fontSize="md" color="gray.600" mt={5}>
                Updated by{" "}
                <Heading fontSize="md" color="black" as="span">
                  {data.getProduct.updatedBy.username}
                </Heading>{" "}
                <Heading fontSize="md" color="black" as="span">
                  {formatTime(data.getProduct.updatedAt)}
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
