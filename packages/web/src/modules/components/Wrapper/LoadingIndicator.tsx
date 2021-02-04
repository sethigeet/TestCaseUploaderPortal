import { FC } from "react";

import { Box, Spinner } from "@chakra-ui/react";

interface LoadingIndicatorProps {
  loading: boolean;
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ loading }) => {
  if (loading) {
    return (
      <Box
        pos="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="grid"
        placeItems="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.800"
          size="xl"
          zIndex={101}
        />
        <Box
          pos="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          bg="black"
          opacity={0.4}
          zIndex={100}
        />
      </Box>
    );
  }

  return <></>;
};
