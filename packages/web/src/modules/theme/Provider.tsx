import { FC } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";

export const ThemeProvider: FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};
