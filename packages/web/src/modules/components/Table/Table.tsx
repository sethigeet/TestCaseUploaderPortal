/* eslint-disable react/jsx-key */
import { FC, useMemo } from "react";

import { Column, useTable, useSortBy, usePagination } from "react-table";

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  TableCaption,
} from "@chakra-ui/react";

import { getSortTypes } from "./getSortTypes";
import { Pagination } from "./Pagination";
import { BodyRow } from "./BodyRow";
import { Header } from "./HeaderRow";

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
        <Header headerGroups={headerGroups} />
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
            <BodyRow
              row={row}
              showLink={showLink}
              initialRoute={initialRoute}
            />
          );
        })}
      </Tbody>
      <TableCaption>
        <Pagination
          nextPage={nextPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          pageCount={pageCount}
          pageOptions={pageOptions}
          pageIndex={pageIndex}
        />
      </TableCaption>
    </ChakraTable>
  );
};
