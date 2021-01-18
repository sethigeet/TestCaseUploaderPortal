import { FC } from "react";

import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";

type Props = InputProps & {
  label: string;
  name: string;
};

export const InputField: FC<Props> = ({ label, name, ...props }) => {
  const [field, meta] = useField({ name });

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
