import { FC } from "react";

import { Box, Button } from "@chakra-ui/react";

import { FormContainer, BooleanSwitch, InputField } from "../../../components";

interface CreateMasterFormProps {
  isSubmitting: boolean;
  showPreviousButton?: boolean;
  onClickPrevious?: () => void;
}

export const CreateMasterForm: FC<CreateMasterFormProps> = ({
  isSubmitting,
  showPreviousButton = false,
  onClickPrevious,
}) => {
  return (
    <FormContainer>
      <Box>
        <InputField name="code" label="Code" placeholder="Code" w="400px" />
      </Box>
      <Box mt={4}>
        <InputField name="name" label="Name" placeholder="Name" w="400px" />
      </Box>
      <Box mt={4} alignSelf="flex-start">
        <BooleanSwitch name="deprecated" label="Deprecated?" size="lg" />
      </Box>
      <Box mt={4} w="100%" display="flex" justifyContent="space-between">
        {showPreviousButton && (
          <Button
            bg="gray.300"
            color="black"
            borderRadius={10}
            px={39}
            py={25}
            onClick={onClickPrevious}
          >
            Previous
          </Button>
        )}
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
    </FormContainer>
  );
};
