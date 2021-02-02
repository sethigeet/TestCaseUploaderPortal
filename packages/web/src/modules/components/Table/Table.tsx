/* eslint-disable react/jsx-key */
import { FC, useMemo } from "react";

import { Link } from "react-router-dom";

import { Column, useTable, useSortBy, usePagination } from "react-table";

import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@chakra-ui/icons";

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
    page,
    prepareRow,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns: columns,
      data: data,
      sortTypes,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    usePagination
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
        {page.map((row) => {
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
      <TableCaption>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box mr={5}>
            <Text>
              Page
              <strong style={{ marginLeft: 5 }}>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </Text>
          </Box>
          <Button
            variant="ghost"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon w={25} h={25} />
          </Button>
          <Button variant="ghost" onClick={nextPage} disabled={!canNextPage}>
            <ChevronRightIcon w={25} h={25} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ArrowRightIcon />
          </Button>
        </Box>
      </TableCaption>
    </ChakraTable>
  );
};
