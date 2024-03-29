import { FC } from "react";

import { Link, useRouteMatch } from "react-router-dom";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { capitalise } from "@portal/common";

export const Breadcrumbs: FC = () => {
  const route = useRouteMatch();
  const crumbs = route.path
    .split("/")
    .filter((c) => c !== "")
    .map((c) => {
      if (c.charAt(0) === ":") {
        const newC = c.slice(1);
        if (newC.includes("Id")) {
          return newC.split("Id")[0];
        }
        return newC;
      }
      return c;
    })
    .map((c) => capitalise(c));

  const crumbLinks = route.url.split("/").filter((c) => c !== "");

  if (crumbs.length === 0) {
    return null;
  }

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

          const toLink = "/" + crumbLinks.slice(0, i + 1).join("/");

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
