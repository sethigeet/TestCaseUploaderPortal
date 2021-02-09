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
    <Box {...props} pos="relative">
      <Box display="flex" justifyContent="center" alignItems="center">
        <StepBubble isActive={isActive} isDone={isDone} index={index} />
        {!isLast ? <StepConnector isDone={isDone} /> : <div></div>}
      </Box>
      <Box>
        <Text
          pos="absolute"
          left="22.5px"
          transform="translateX(-50%)"
          textAlign="center"
        >
          {label}
        </Text>
      </Box>
    </Box>
  );
};
