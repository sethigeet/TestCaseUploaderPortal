import { FC } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { GetProductsQuery } from "@portal/controller";
import { capitalise } from "@portal/common";

import { ErrorMessageType } from "../../../../types";
import { Table, Wrapper } from "../../../../components";
import { MASTER_COLUMNS } from "../..";

interface ViewAllMastersProps {
  data?: GetProductsQuery["getProducts"];
  loading?: boolean;
  errorMessage?: ErrorMessageType;
  masterName: string;
}

export const ViewAllMastersView: FC<ViewAllMastersProps> = ({
  data,
  loading,
  errorMessage,
  masterName,
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
              {capitalise(masterName)}s
            </Heading>
          </Box>
          <Table
            columnProperties={MASTER_COLUMNS}
            data={data}
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
