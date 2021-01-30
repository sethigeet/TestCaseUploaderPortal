import { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

import { ErrorMessageType } from "../types";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ErrorMessage } from "./ErrorMessage";
import { displayErrorToast } from "./ErrorToast";

type WrapperProps = BoxProps & {
  variant?: "small" | "medium" | "large";
  errorMessage?: ErrorMessageType;
  errorIsToast?: boolean;
};

export const Wrapper: FC<WrapperProps> = ({
  variant = "large",
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
      {errorMessage && !errorIsToast && (
        <Box mt={4} maxW="600px">
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
