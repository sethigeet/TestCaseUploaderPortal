import { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

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

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
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
