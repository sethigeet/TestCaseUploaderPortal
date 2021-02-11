import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { createMenuSchema } from "@portal/common";
import { GetModulesQuery, GetProductsQuery } from "@portal/controller";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateMenuFormOnSubmit } from "../CreateMenuConnector";
import { CreateMenuForm } from "./CreateMenuForm";

interface CreateMenuViewProps {
  products?: GetProductsQuery["getProducts"];
  modules?: GetModulesQuery["getModules"];
  productId: string;
  setProductId: (val: string) => void;
  loading: boolean;
  onSubmit: CreateMenuFormOnSubmit;
  errorMessage?: ErrorMessageType;
}

export const CreateMenuView: FC<CreateMenuViewProps> = ({
  loading,
  products,
  modules,
  productId,
  setProductId,
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
            moduleId: "",
            code: "",
            name: "",
            deprecated: false,
          } as any
        }
        onSubmit={onSubmit}
        validationSchema={createMenuSchema}
      >
        {({ isSubmitting, validateForm, setFieldTouched }) => (
          <Form>
            <CreateMenuForm
              products={products}
              modules={modules}
              productId={productId}
              setProductId={setProductId}
              canNext={async () => {
                setFieldTouched("moduleId", true);
                const errors = await validateForm();

                if (!errors.moduleId) {
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
