import { FC } from "react";

import { Heading } from "@chakra-ui/react";

import { Wrapper } from "../components";

export const NotFound: FC = () => {
  return (
    <Wrapper>
      <Heading>The page you are looking for does not exist!</Heading>
    </Wrapper>
  );
};
