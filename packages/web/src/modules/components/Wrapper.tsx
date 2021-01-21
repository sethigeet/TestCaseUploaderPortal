import { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ErrorMessage } from "./ErrorMessage";

type WrapperProps = BoxProps & {
  variant?: "small" | "medium" | "large";
  errorMessage?: { title?: string; message: string };
};

export const Wrapper: FC<WrapperProps> = ({
  variant = "large",
  errorMessage,
  children,
  ...props
}) => {
  const maxW =
    variant === "small" ? "600px" : variant === "medium" ? "800px" : "100%";

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      {errorMessage && (
        <Box mt={4} maxW="600px">
          <ErrorMessage
            title={errorMessage.title ? errorMessage.title : undefined}
            message={errorMessage.message}
          />
        </Box>
      )}
      <Box mt={4} alignSelf="center" flex={1} maxW={maxW} {...props}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
