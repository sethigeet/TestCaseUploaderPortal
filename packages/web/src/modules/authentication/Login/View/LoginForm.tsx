import { FC } from "react";

import { InputField } from "../../../components";
import { Box, Button, Image } from "@chakra-ui/react";

// import Img1 from "../../../assets/Rangitikei.svg";
import Img2 from "../../../assets/Reuss.svg";

interface LoginFormProps {
  isSubmitting: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ isSubmitting }) => {
  return (
    <Box p={25} pos="relative">
      <Image src={Img2} w="100%" h="100%" borderRadius={50} />
      <Box
        pos="absolute"
        top={200}
        bottom={200}
        left={200}
        right={200}
        bg="white"
        borderRadius={25}
        p={10}
        boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <InputField
            name="username"
            label="Username"
            placeholder="Username"
            w="400px"
          />
        </Box>
        <Box mt={4}>
          <InputField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            w="400px"
          />
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
