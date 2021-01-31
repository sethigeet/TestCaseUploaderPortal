import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: "Montserrat, sans-serif",
  heading: "Montserrat, sans-serif",
};

const colors = {
  black: "#333",
};

const shadows = {
  elevated: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
};

export const theme = extendTheme({ fonts, colors, shadows });
