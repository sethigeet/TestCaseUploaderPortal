import { FC, useState } from "react";

import { Box, Button } from "@chakra-ui/react";

import { GetProductsQuery } from "@portal/controller";

import { FormContainer, SelectField, Stepper } from "../../../../components";

import { CreateMasterForm } from "../../../base";

interface CreateModuleFormProps {
  products?: GetProductsQuery["getProducts"];
  canNext: () => Promise<boolean>;
  isSubmitting: boolean;
}

export const CreateModuleForm: FC<CreateModuleFormProps> = ({
  products,
  canNext,
  isSubmitting,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        labels={["Select Product", "Enter info"]}
      >
        <FormContainer>
          {products && (
            <>
              <SelectField
                label="Product"
                name="productId"
                placeholder="Select a product"
                options={products.map((product) => ({
                  label: `${product.code} - ${product.name}`,
                  value: product.id,
                }))}
              />
              <Box mt={25}>
                <Button
                  ml="auto"
                  onClick={async () => (await canNext()) && setActiveStep(1)}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </FormContainer>
        <CreateMasterForm
          isSubmitting={isSubmitting}
          showPreviousButton
          onClickPrevious={() => setActiveStep(0)}
        />
      </Stepper>
    </div>
  );
};
