import { createStandaloneToast } from "@chakra-ui/react";

interface Options {
  title?: string;
  message?: string;
}

export const displayErrorToast = ({ title, message }: Options): void => {
  const toast = createStandaloneToast();

  toast({
    title: title ? title : "An error occurred.",
    description: message ? message : "",
    status: "error",
    duration: 10000,
    isClosable: true,
    position: "top",
  });
};
