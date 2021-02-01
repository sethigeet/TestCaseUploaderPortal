import { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Box,
  BoxProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { ErrorMessageType } from "../types";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ErrorMessage } from "./ErrorMessage";
import { displayErrorToast } from "./ErrorToast";
import { LoadingIndicator } from "./LoadingIndicator";

type WrapperProps = BoxProps & {
  variant?: "small" | "medium" | "large";
  loading?: boolean;
  errorMessage?: ErrorMessageType;
  errorIsToast?: boolean;
};

export const Wrapper: FC<WrapperProps> = ({
  variant = "large",
  loading,
  errorMessage,
  errorIsToast = false,
  children,
  ...props
}) => {
  const maxW =
    variant === "small" ? "600px" : variant === "medium" ? "800px" : "100%";

  const showToast = (): void => {
    displayErrorToast({
      title: errorMessage?.title ? errorMessage?.title : "An error occurred",
      message: errorMessage?.message ? errorMessage.message : "",
    });
  };

  const location = useLocation();
  const crumbs = location.pathname
    .split("/")
    .slice(1)
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1));

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      {crumbs.length > 1 && (
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
      )}
      {loading && <LoadingIndicator loading={loading} />}
      {errorMessage && !errorIsToast && (
        <Box mt={4} minW={600} maxW={600} alignSelf="center">
          <ErrorMessage
            title={errorMessage.title ? errorMessage.title : undefined}
            message={errorMessage.message}
          />
        </Box>
      )}
      {errorMessage && errorIsToast && showToast()}
      <Box mt={4} alignSelf="center" flex={1} maxW={maxW} {...props}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
