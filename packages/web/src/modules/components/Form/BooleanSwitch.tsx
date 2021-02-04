import React, { FC } from "react";

import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  SwitchProps,
  FormHelperText,
  Switch,
} from "@chakra-ui/react";

type Props = SwitchProps & {
  label: string;
  name: string;
};

export const BooleanSwitch: FC<Props> = ({ label, name, ...props }) => {
  const [field, meta] = useField({ name });

  const isInvalid = !!meta.error && meta.touched;

  return (
    <FormControl isInvalid={isInvalid} display="flex">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Switch {...field} {...props} id={field.name} isChecked={field.value} />
      {isInvalid ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <FormHelperText>&nbsp;</FormHelperText>
      )}
    </FormControl>
  );
};
