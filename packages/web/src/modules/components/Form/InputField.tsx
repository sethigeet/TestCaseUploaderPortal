import { FC } from "react";

import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  FormHelperText,
} from "@chakra-ui/react";

type Props = InputProps & {
  label: string;
  name: string;
};

export const InputField: FC<Props> = ({ label, name, ...props }) => {
  const [field, meta] = useField({ name });

  const isInvalid = !!meta.error && meta.touched;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {isInvalid ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <FormHelperText>&nbsp;</FormHelperText>
      )}
    </FormControl>
  );
};
