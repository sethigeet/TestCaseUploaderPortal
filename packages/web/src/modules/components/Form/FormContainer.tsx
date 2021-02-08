import { FC } from "react";

import { Box } from "@chakra-ui/react";

export const FormContainer: FC = ({ children }) => {
  return (
    <Box p={25}>
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
