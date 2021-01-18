import { Box } from "@chakra-ui/react";
import { FC } from "react";

import { Navbar } from "./Navbar";

interface WrapperProps {
  variant?: "small" | "medium" | "large";
}

export const Wrapper: FC<WrapperProps> = ({ variant = "large", children }) => {
  const maxW =
    variant === "small" ? "600px" : variant === "medium" ? "800px" : "100%";

  return (
    <Box display="flex" flexDirection="column">
      <Navbar />
      <Box mt={4} alignSelf="center" flex={1} maxW={maxW}>
        {children}
      </Box>
    </Box>
  );
};
