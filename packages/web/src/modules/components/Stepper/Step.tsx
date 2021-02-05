import { FC } from "react";

import { Box, BoxProps, Text } from "@chakra-ui/react";

import { StepBubble } from "./StepBubble";
import { StepConnector } from "./StepConnector";

interface StepProps extends BoxProps {
  isLast: boolean;
  isActive: boolean;
  isDone: boolean;
  label: string;
  index: number;
}

export const Step: FC<StepProps> = ({
  isActive,
  isDone,
  isLast,
  label,
  index,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <StepBubble isActive={isActive} isDone={isDone} index={index} />
        {!isLast ? (
          <StepConnector isDone={isDone} />
        ) : (
          <Box bg="white" h={1} w={3} />
        )}
      </Box>
      <Box>
        <Text>{label}</Text>
      </Box>
    </Box>
  );
};
