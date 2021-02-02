/* eslint-disable react/jsx-key */
import { FC } from "react";

import { Row as TableRowType } from "react-table";

import { Tr, Td, Link } from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface BodyRowProps {
  row: TableRowType;
  showLink?: boolean;
  initialRoute?: string;
}

export const BodyRow: FC<BodyRowProps> = ({ row, showLink, initialRoute }) => {
  return (
    <Tr
      {...row.getRowProps()}
      transition="all 0.3s ease"
      _hover={{
        bg: "blue.50",
        boxShadow: "xl",
      }}
    >
      {row.cells.map((cell) => {
        if (showLink && initialRoute) {
          if (cell.column.Header === "ID") {
            return (
              <Td {...cell.getCellProps()}>
                <Link to={`${initialRoute}/${cell.value}`}>
                  <ArrowForwardIcon />
                </Link>
              </Td>
            );
          }
        }

        if (cell.column.Header === "Deprecated") {
          return (
            <Td {...cell.getCellProps()} textAlign="center">
              {cell.value ? <CheckIcon /> : <CloseIcon />}
            </Td>
          );
        }

        if (!cell.value) {
          return (
            <Td {...cell.getCellProps()} textAlign="center">
              {cell.render("Cell")}
            </Td>
          );
        }
        return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
      })}
    </Tr>
  );
};
