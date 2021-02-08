import { FC } from "react";

import { useField } from "formik";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps extends SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
}

export const SelectField: FC<SelectInputProps> = ({
  label,
  name,
  options,
  ...props
}) => {
  const [field, meta] = useField({ name });

  const isInvalid = !!meta.error && meta.touched;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props} id={field.name}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      {isInvalid ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : (
        <FormHelperText>&nbsp;</FormHelperText>
      )}
    </FormControl>
  );
};
