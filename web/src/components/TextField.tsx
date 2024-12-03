import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  helperText,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {helperText && (
        <Text fontSize="smaller" color="gray.500">
          {helperText}
        </Text>
      )}
      <Field as={Input} id={field.name} {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default TextField;
