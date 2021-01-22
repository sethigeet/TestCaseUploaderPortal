import { FC } from "react";

import { Heading } from "@chakra-ui/react";

import { Wrapper } from "../../../components";

interface CreateTestCaseViewProps {
  size?: number;
}

export const CreateTestCaseView: FC<CreateTestCaseViewProps> = () => {
  return (
    <Wrapper>
      <Heading>Create test case view</Heading>
    </Wrapper>
  );
};
