import { FC } from "react";

import { Box, Button } from "@chakra-ui/react";

import { BooleanSwitch, InputField } from "../../components";

interface CreateMasterFormProps {
  isSubmitting: boolean;
}

export const CreateMasterForm: FC<CreateMasterFormProps> = ({
  isSubmitting,
}) => {
  return (
    <Box p={25}>
      <Box
        bg="white"
        borderRadius={25}
        p={10}
        boxShadow="elevated"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <InputField name="code" label="Code" placeholder="Code" w="400px" />
        </Box>
        <Box mt={4}>
          <InputField name="name" label="Name" placeholder="Name" w="400px" />
        </Box>
        <Box mt={4} alignSelf="flex-start">
          <BooleanSwitch name="deprecated" label="Deprecated?" size="lg" />
        </Box>
        <Box mt={4} textAlign="center">
          <Button
            bg="blue.700"
            color="white"
            isLoading={isSubmitting}
            type="submit"
            borderRadius={10}
            px={39}
            py={25}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
