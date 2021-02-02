import { FC } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { GetProductsQueryHookResult } from "@portal/controller";

import { ErrorMessageType } from "../../../../../types";
import { Table, Wrapper } from "../../../../../components";
import { MASTER_COLUMNS } from "../../../../base";

interface AllProductsViewProps {
  data?: GetProductsQueryHookResult["data"];
  loading?: boolean;
  errorMessage?: ErrorMessageType;
}

export const ViewAllProductsView: FC<AllProductsViewProps> = ({
  data,
  loading,
  errorMessage,
}) => {
  return (
    <Wrapper loading={loading} errorMessage={errorMessage}>
      {data && (
        <Box display="flex" flexDirection="column">
          <Box
            textAlign="center"
            mb={10}
            display="flex"
            justifyContent="center"
          >
            <Heading
              size="3xl"
              fontWeight={400}
              borderBottomWidth={2}
              pb={1}
              borderColor="#ddd"
            >
              Products
            </Heading>
          </Box>
          <Table
            columnProperties={MASTER_COLUMNS}
            data={data.getProducts}
            showLink
            initialRoute="/masters/products"
          />
          <Button
            as={Link}
            to="/masters/products/create"
            bg="blue.700"
            color="white"
            mx="auto"
            my={10}
          >
            Create New
            <AddIcon ml={2} />
          </Button>
        </Box>
      )}
    </Wrapper>
  );
};
