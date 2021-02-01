import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { createProductSchema } from "@portal/common";
import { CreateProductInput } from "@portal/controller";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateMasterForm } from "../../../base";

import { CreateProductFormOnSubmit } from "../CreateProductConnector";

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
        initialValues={
          { code: "", name: "", deprecated: false } as CreateProductInput
        }
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
