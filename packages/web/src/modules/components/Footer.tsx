import { FC } from "react";

import { Box, Text } from "@chakra-ui/react";

export const Footer: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={4}
      px={6}
      pos="static"
      bottom={0}
      right={0}
      left={0}
      h="6vh"
      bg="blue.800"
      color="white"
    >
      <Text fontSize="md" ml={10}>
        &copy; 2021 TheGreatGeet
      </Text>
    </Box>
  );
};
