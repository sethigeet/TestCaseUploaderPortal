import { FC } from "react";

import { Link } from "react-router-dom";

import { Alert, AlertIcon, Box, Button, Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { capitalise } from "@portal/common";

import { ErrorMessageType } from "../../../../types";
import { Master } from "../../../../utils";
import { Table, Wrapper } from "../../../../components";

import { MASTER_COLUMNS } from "../../MasterColumns";

interface ViewAllMastersProps {
  data?: Master[];
  loading?: boolean;
  errorMessage?: ErrorMessageType;
  masterName: string;
  withWrapper?: boolean;
}

export const ViewAllMastersView: FC<ViewAllMastersProps> = ({
  data,
  loading,
  errorMessage,
  masterName,
  withWrapper = false,
}) => {
  let Container: any;
  if (withWrapper) {
    Container = Wrapper;
  } else {
    Container = Box;
  }

  return (
    <>
      <Container loading={loading} errorMessage={errorMessage}>
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
            {data.length > 0 ? (
              <Table
                columnProperties={MASTER_COLUMNS}
                data={data}
                showLink
                initialRoute={`/masters/${masterName}s`}
              />
            ) : (
              <Alert status="info" borderRadius={15}>
                <AlertIcon />
                There are no {masterName}s!
              </Alert>
            )}
            <Button
              as={Link}
              to={`/masters/${masterName}s/create`}
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
      </Container>
    </>
  );
};
