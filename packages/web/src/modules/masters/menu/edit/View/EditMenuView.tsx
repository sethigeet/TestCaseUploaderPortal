import { FC } from "react";

import { Form, Formik } from "formik";

import { Box, Heading } from "@chakra-ui/react";

import { editMenuSchema } from "@portal/common";
import { EditMenuInput } from "@portal/controller";

import { ErrorMessageType } from "../../../../types";
import { Wrapper } from "../../../../components";

import { CreateMasterForm } from "../../../base";

import { EditMenuFormOnSubmit } from "../EditMenuConnector";

interface EditMenuViewProps {
  initialValues?: EditMenuInput;
  onSubmit: EditMenuFormOnSubmit;
  errorMessage?: ErrorMessageType;
  loading: boolean;
}

export const EditMenuView: FC<EditMenuViewProps> = ({
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
              Edit the Menu
            </Heading>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={editMenuSchema}
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
