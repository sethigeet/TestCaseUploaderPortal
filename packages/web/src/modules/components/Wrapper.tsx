import { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type WrapperProps = BoxProps & {
  variant?: "small" | "medium" | "large";
};

export const Wrapper: FC<WrapperProps> = ({
  variant = "large",
  children,
  ...props
}) => {
  const maxW =
    variant === "small" ? "600px" : variant === "medium" ? "800px" : "100%";

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      <Box mt={4} alignSelf="center" flex={1} maxW={maxW} {...props}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
