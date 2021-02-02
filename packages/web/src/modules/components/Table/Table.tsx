/* eslint-disable react/jsx-key */
import { FC, useMemo } from "react";

import { Link } from "react-router-dom";

import { Column, useTable, useSortBy } from "react-table";

import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { SortIcon } from "./SortIcon";
import { getSortTypes } from "./getSortTypes";

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
  const sortTypes = useMemo(getSortTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: data,
      sortTypes,
    },
    useSortBy
  );

  return (
    <ChakraTable {...getTableProps()} fontSize={20}>
      <Thead bg="blue.700">
        {headerGroups.map((headerGroup, hi) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((header, hgi, arr) => {
              const borderTopLeftRadius = hi === 0 ? (hgi === 0 ? 15 : 0) : 0;
              const borderTopRightRadius =
                hi === 0 ? (hgi === arr.length - 1 ? 15 : 0) : 0;
              return (
                <Th
                  {...header.getHeaderProps(header.getSortByToggleProps())}
                  textAlign="center"
                  color="white"
                  fontSize={13}
                  borderTopLeftRadius={borderTopLeftRadius}
                  borderTopRightRadius={borderTopRightRadius}
                >
                  {showLink && initialRoute && header.Header === "ID" ? null : (
                    <>
                      {header.render("Header")}
                      <span>
                        <SortIcon header={header} />
                      </span>
                    </>
                  )}
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
        })}
      </Tbody>
    </ChakraTable>
  );
};
