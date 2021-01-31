/* eslint-disable react/jsx-key */
import { FC, useMemo } from "react";

import { Link } from "react-router-dom";

import { Column, useTable } from "react-table";

import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface TableProps {
  columnProperties: Column[];
  data: any[];
  showLink?: boolean;
  initialRoute?: string;
}

export const Table: FC<TableProps> = ({
  columnProperties,
  data: dataToBeMemoised,
  showLink,
  initialRoute,
}) => {
  const columns = useMemo(() => columnProperties, []);
  const data = useMemo(() => dataToBeMemoised, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columns,
    data: data,
  });

  return (
    <ChakraTable {...getTableProps()} fontSize={20}>
      <Thead bg="blue.400">
        {headerGroups.map((headerGroup, hi) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, hgi, arr) => {
              const borderTopLeftRadius = hi === 0 ? (hgi === 0 ? 15 : 0) : 0;
              const borderTopRightRadius =
                hi === 0 ? (hgi === arr.length - 1 ? 15 : 0) : 0;
              return (
                <Th
                  {...column.getHeaderProps()}
                  textAlign="center"
                  color="white"
                  borderTopLeftRadius={borderTopLeftRadius}
                  borderTopRightRadius={borderTopRightRadius}
                >
                  {showLink && initialRoute && column.Header === "ID"
                    ? ""
                    : column.render("Header")}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody
        {...getTableBodyProps()}
        border="1px"
        borderColor="gray.50"
        boxShadow="elevated"
      >
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps()}
              transition="all 0.2s ease"
              _hover={{ bg: "blue.50" }}
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
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};
