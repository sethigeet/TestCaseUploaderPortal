import { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const Breadcrumbs: FC = () => {
  const location = useLocation();
  const crumbs = location.pathname
    .split("/")
    .slice(1)
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1));

  return (
    <Box
      mt={3}
      mx={10}
      p={3}
      borderColor="gray.300"
      borderTopWidth={1}
      borderBottomWidth={1}
    >
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        {crumbs.map((crumb, i, arr) => {
          const isCurrentPage = i === arr.length - 1;

          const toLink =
            "/" +
            arr
              .slice(0, i + 1)
              .map((c) => c.charAt(0).toLowerCase() + c.slice(1))
              .join("/");

          return (
            <BreadcrumbItem key={i}>
              {isCurrentPage ? (
                <BreadcrumbLink
                  isCurrentPage
                  fontWeight="bold"
                  transform="scale(1.05)"
                  pointerEvents="none"
                >
                  {crumb}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink
                  as={Link}
                  to={toLink}
                  isCurrentPage={isCurrentPage}
                >
                  {crumb}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
};
