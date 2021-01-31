import { FC } from "react";

import { Box, Heading } from "@chakra-ui/react";

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
        <>
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
        </>
      )}
    </Wrapper>
  );
};
