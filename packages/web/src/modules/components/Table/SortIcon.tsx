import { FC } from "react";

import { HeaderGroup } from "react-table";

import { TriangleDownIcon } from "@chakra-ui/icons";

interface SortIconProps {
  header: HeaderGroup;
}

export const SortIcon: FC<SortIconProps> = ({ header }) => {
  if (header.canSort) {
    return (
      <TriangleDownIcon
        color={header.isSorted ? "white" : "gray.500"}
        transform={`rotate(${header.isSortedDesc ? "180deg" : "0deg"})`}
        transition="all 0.3s ease"
        ml={2}
      />
    );
  }

  return null;
};
