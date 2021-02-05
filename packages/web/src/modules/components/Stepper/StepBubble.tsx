import { FC } from "react";

import { Box, Text } from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

interface StepBubbleProps {
  isActive: boolean;
  isDone: boolean;
  index: number;
}

export const StepBubble: FC<StepBubbleProps> = ({
  isActive,
  isDone,
  index,
}) => {
  return (
    <Box>
      <Box
        w="45px"
        h="45px"
        borderRadius="50%"
        color={isActive || isDone ? "white" : "black"}
        bg="gray.300"
        fontWeight="bold"
        display="grid"
        placeItems="center"
        pos="relative"
        overflow="hidden"
      >
        <Box
          bg="blue.300"
          borderRadius="50%"
          zIndex={1}
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          right={isActive || isDone ? 0 : "100%"}
          opacity={isActive || isDone ? 1 : 0}
          transition="all 0.3s ease"
          style={{ transitionDelay: isActive ? "0.3s" : "0s" }}
        />
        {isDone ? (
          <CheckIcon
            zIndex={2}
            transition="all 0.3s ease"
            style={{ transitionDelay: isActive ? "0.3s" : "0s" }}
          />
        ) : (
          <Text
            zIndex={2}
            transition="all 0.3s ease"
            style={{ transitionDelay: isActive ? "0.3s" : "0s" }}
          >
            {index + 1}
          </Text>
        )}
      </Box>
    </Box>
  );
};
