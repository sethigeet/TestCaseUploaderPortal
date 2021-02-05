import { FC, Children } from "react";

import { Box } from "@chakra-ui/react";

import { Step } from "./Step";

interface StepperProps {
  activeStep: number;
  labels: string[];
  children: JSX.Element[];
}

export const Stepper: FC<StepperProps> = ({ children, activeStep, labels }) => {
  const steps = Children.toArray(children);

  if (labels.length !== steps.length) {
    throw new Error(
      "The lenght of the labels and the number of children must be the same!"
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {steps.map((_, i, arr) => {
          const isLast = i === arr.length - 1;
          const isActive = activeStep === i;
          const isDone = activeStep > i;
          const label = labels[i];

          return (
            <Step
              key={i}
              isLast={isLast}
              isActive={isActive}
              isDone={isDone}
              label={label}
              index={i}
            />
          );
        })}
      </Box>
      <Box>{steps[activeStep]}</Box>
    </Box>
  );
};
