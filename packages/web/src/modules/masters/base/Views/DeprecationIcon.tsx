import { FC } from "react";

import { Badge, Box, BoxProps } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

interface DeprecationIconProps extends BoxProps {
  deprecated: boolean;
}

export const DeprecationIcon: FC<DeprecationIconProps> = ({
  deprecated,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Badge
        colorScheme={deprecated ? "red" : "green"}
        h={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={3}
        borderRadius={8}
      >
        <Box display="flex" alignItems="center">
          {deprecated ? (
            <>
              <WarningIcon mr={2} w={5} h={5} />
              Deprecated
            </>
          ) : (
            <>
              <CheckCircleIcon mr={2} w={5} h={5} />
              Not Deprecated
            </>
          )}
        </Box>
      </Badge>
    </Box>
  );
};
