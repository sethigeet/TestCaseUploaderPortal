import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { editModuleSchema } from "@portal/common";
import { EditModuleInput } from "@portal/controller";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateMasterForm } from "../../../base";

import { EditModuleFormOnSubmit } from "../EditModuleConnector";

interface EditModuleViewProps {
  initialValues?: EditModuleInput;
  onSubmit: EditModuleFormOnSubmit;
  errorMessage?: ErrorMessageType;
  loading: boolean;
}

export const EditModuleView: FC<EditModuleViewProps> = ({
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
            validationSchema={editModuleSchema}
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
