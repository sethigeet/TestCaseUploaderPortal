import { FC } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Heading } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { ErrorMessageType } from "../../../../types";
import { formatTime, Master } from "../../../../utils";
import { Wrapper } from "../../../../components";

import { DeprecationIcon } from "../DeprecationIcon";

import { ChildMasterTable } from "./ChildMasterTable";

interface ViewSingleMasterViewProps {
  data?: Master;
  loading?: boolean;
  errorMessage?: ErrorMessageType;
  masterName: string;
  childName: string;
}

export const ViewSingleMasterView: FC<ViewSingleMasterViewProps> = ({
  data,
  loading,
  errorMessage,
  masterName,
  childName,
}) => {
  return (
    <Wrapper loading={loading} errorMessage={errorMessage}>
      {data && (
        <Box p={25}>
          <Box my={15} display="flex">
            <Box>
              <Heading size="md" color="gray.500" mb={2}>
                {data.code}
              </Heading>
              <Heading size="3xl">{data.name}</Heading>
            </Box>
            <DeprecationIcon deprecated={data.deprecated} ml={100} />
            <Button
              as={Link}
              to={`/masters/products/${data.id}/edit`}
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
                {data.createdBy.username}
              </Heading>{" "}
              <Heading fontSize="md" color="black" as="span">
                {formatTime(data.createdAt)}
              </Heading>
            </Heading>
            {data.updatedBy && data.updatedAt && (
              <Heading fontSize="md" color="gray.600" mt={5}>
                Updated by{" "}
                <Heading fontSize="md" color="black" as="span">
                  {data.updatedBy.username}
                </Heading>{" "}
                <Heading fontSize="md" color="black" as="span">
                  {formatTime(data.updatedAt)}
                </Heading>
              </Heading>
            )}
          </Box>
          <ChildMasterTable
            masterName={masterName}
            childName={childName}
            data={data}
          />
        </Box>
      )}
    </Wrapper>
  );
};
