import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { createProductSchema } from "@portal/common";
import { CreateProductInput } from "@portal/controller";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateMasterForm } from "../../../base";

import { EditProductFormOnSubmit } from "../EditProductConnector";

interface CreateProductViewProps {
  initialValues?: CreateProductInput;
  onSubmit: EditProductFormOnSubmit;
  errorMessage?: ErrorMessageType;
  loading: boolean;
}

export const EditProductView: FC<CreateProductViewProps> = ({
  initialValues,
  onSubmit,
  errorMessage,
  loading,
}) => {
  return (
    <Wrapper loading={loading} errorMessage={errorMessage} errorIsToast>
      {initialValues && (
        <>
          <Box
            textAlign="center"
            mb={10}
            display="flex"
            justifyContent="center"
          >
            <Heading
              size="3xl"
              fontWeight={400}
              borderBottomWidth={2}
              pb={1}
              borderColor="#ddd"
            >
              Edit the Product
            </Heading>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={createProductSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <CreateMasterForm isSubmitting={isSubmitting} />
              </Form>
            )}
          </Formik>
        </>
      )}
    </Wrapper>
  );
};
