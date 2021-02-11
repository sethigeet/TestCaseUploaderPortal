import { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

export const FormContainer: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box p={25} minW={600} {...props}>
      <Box
        bg="white"
        borderRadius={25}
        p={10}
        boxShadow="elevated"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  );
};
