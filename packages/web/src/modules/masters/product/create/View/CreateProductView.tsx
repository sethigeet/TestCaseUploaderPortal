import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { createProductSchema } from "@portal/common";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateProductFormOnSubmit } from "../CreateProductConnector";

import { CreateMasterForm } from "../../../base";

interface CreateProductViewProps {
  onSubmit: CreateProductFormOnSubmit;
  errorMessage?: ErrorMessageType;
}

export const CreateProductView: FC<CreateProductViewProps> = ({
  onSubmit,
  errorMessage,
}) => {
  return (
    <Wrapper errorMessage={errorMessage} errorIsToast>
      <Box textAlign="center" mb={10} display="flex" justifyContent="center">
        <Heading
          size="3xl"
          fontWeight={400}
          borderBottomWidth={2}
          pb={1}
          borderColor="#ddd"
        >
          Create a Product
        </Heading>
      </Box>
      <Formik
        initialValues={{ code: "", name: "", deprecated: false }}
        onSubmit={onSubmit}
        validationSchema={createProductSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <CreateMasterForm isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
