import { FC } from "react";

import { Box, Button, Text } from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

interface PaginationProps {
  pageIndex: number;
  nextPage: () => void;
  canNextPage: boolean;
  previousPage: () => void;
  canPreviousPage: boolean;
  gotoPage: (pageNumber: number) => void;
  pageCount: number;
  pageOptions: number[];
}

export const Pagination: FC<PaginationProps> = ({
  canNextPage,
  nextPage,
  canPreviousPage,
  previousPage,
  gotoPage,
  pageIndex,
  pageCount,
  pageOptions,
}) => {
  return (
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
  );
};
