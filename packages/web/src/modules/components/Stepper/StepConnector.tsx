import { FC } from "react";

import { Box } from "@chakra-ui/react";

interface StepConnectorProps {
  isDone: boolean;
}

export const StepConnector: FC<StepConnectorProps> = ({ isDone }) => {
  return (
    <Box height={1} width="100%" minW={100} pos="relative" bg="gray.300">
      <Box
        bg="blue.300"
        pos="absolute"
        left={0}
        top={0}
        bottom={0}
        right={isDone ? 0 : "100%"}
        transition="all 0.3s ease"
        style={{ transitionDelay: isDone ? "0s" : "0.3s" }}
      />
    </Box>
  );
};
