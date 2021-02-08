import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { createModuleSchema } from "@portal/common";
import { CreateModuleInput, GetProductsQuery } from "@portal/controller";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateModuleFormOnSubmit } from "../CreateModuleConnector";
import { CreateModuleForm } from "./CreateModuleForm";

interface CreateModuleViewProps {
  products?: GetProductsQuery["getProducts"];
  loading: boolean;
  onSubmit: CreateModuleFormOnSubmit;
  errorMessage?: ErrorMessageType;
}

export const CreateModuleView: FC<CreateModuleViewProps> = ({
  loading,
  products,
  onSubmit,
  errorMessage,
}) => {
  return (
    <Wrapper errorMessage={errorMessage} errorIsToast loading={loading}>
      <Box textAlign="center" mb={10} display="flex" justifyContent="center">
        <Heading
          size="3xl"
          fontWeight={400}
          borderBottomWidth={2}
          pb={1}
          borderColor="#ddd"
        >
          Create a Module
        </Heading>
      </Box>
      <Formik
        initialValues={
          {
            productId: "",
            code: "",
            name: "",
            deprecated: false,
          } as CreateModuleInput
        }
        onSubmit={onSubmit}
        validationSchema={createModuleSchema}
      >
        {({ isSubmitting, validateForm, setFieldTouched }) => (
          <Form>
            <CreateModuleForm
              products={products}
              canNext={async () => {
                setFieldTouched("productId", true);
                const errors = await validateForm();

                if (!errors.productId) {
                  return true;
                }
                return false;
              }}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
