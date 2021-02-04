import { FC } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type LinkProps = ChakraLinkProps & {
  to: string;
  showBorder?: boolean;
};

export const Link: FC<LinkProps> = ({
  to,
  showBorder = false,
  children,
  ...props
}) => {
  return (
    <RouterLink to={to}>
      <ChakraLink
        as="h4"
        mx={5}
        color="blue.900"
        opacity={0.6}
        fontWeight="bold"
        _hover={{
          outline: "none",
          borderBottom: showBorder ? "1px solid" : undefined,
          borderBottomColor: "blue.900",
          transform: "scale(1.1)",
        }}
        {...props}
      >
        {children}
      </ChakraLink>
    </RouterLink>
  );
};
