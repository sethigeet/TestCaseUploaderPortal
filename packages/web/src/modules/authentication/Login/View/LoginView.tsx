import { FC } from "react";

import { Form, Formik } from "formik";
import { Box, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";

import { loginSchema } from "@portal/common";

import {
  CheckCircleIcon,
  BeakerIcon,
  DashboardIcon,
  PencilIcon,
} from "../../../assets/icons";

import { ErrorMessageType } from "../../../types";
import { Wrapper } from "../../../components";

import { LoginFormOnSubmit } from "../LoginConnector";
import { LoginForm } from "./LoginForm";

interface LoginProps {
  onSubmit: LoginFormOnSubmit;
  errorMessage?: ErrorMessageType;
}

export const LoginView: FC<LoginProps> = ({ onSubmit, errorMessage }) => {
  return (
    <Wrapper
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      px={50}
      errorMessage={errorMessage}
      errorIsToast
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Box>
            <Heading size="4xl" color="blue.900">
              Login Now
            </Heading>
            <Text fontSize="2xl" mt={5} color="blue.900">
              And start testing your code!
            </Text>
          </Box>

          <List spacing={7} textAlign="left" mt={10}>
            <ListItem fontSize={25}>
              <ListIcon as={PencilIcon} color="blue.500" />
              Write down tests
            </ListItem>
            <ListItem fontSize={25}>
              <ListIcon as={CheckCircleIcon} color="blue.500" />
              Get them approved
            </ListItem>
            <ListItem fontSize={25}>
              <ListIcon as={BeakerIcon} color="blue.500" />
              Test them
            </ListItem>
            <ListItem fontSize={25}>
              <ListIcon as={DashboardIcon} color="blue.500" />
              View your performance
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box maxW="50%" h="80vh" ml={30} justifySelf="flex-end">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <LoginForm isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};
