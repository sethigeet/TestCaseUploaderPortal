import { FC, useState } from "react";

import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";

import { GetModulesQuery, GetProductsQuery } from "@portal/controller";

import { FormContainer, SelectField, Stepper } from "../../../../components";

import { CreateMasterForm } from "../../../base";

interface CreateMenuFormProps {
  products?: GetProductsQuery["getProducts"];
  modules?: GetModulesQuery["getModules"];
  productId: string;
  setProductId: (val: string) => void;
  canNext: () => Promise<boolean>;
  isSubmitting: boolean;
}

export const CreateMenuForm: FC<CreateMenuFormProps> = ({
  products,
  modules,
  productId,
  setProductId,
  canNext,
  isSubmitting,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        labels={["Select Product", "Select Module", "Enter info"]}
      >
        <FormContainer>
          {products && (
            <>
              <FormControl>
                <FormLabel>Product</FormLabel>
                <Select
                  placeholder="Select a product"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  {products.map(({ id, code, name }) => (
                    <option key={id} value={id}>
                      {code} - {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Box mt={25}>
                <Button
                  ml="auto"
                  disabled={productId === ""}
                  onClick={() => productId !== "" && setActiveStep(1)}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </FormContainer>
        <FormContainer>
          {modules && (
            <>
              <SelectField
                label="Module"
                name="moduleId"
                placeholder="Select a module"
                options={modules.map((module) => ({
                  label: `${module.code} - ${module.name}`,
                  value: module.id,
                }))}
              />
              <Box
                mt={25}
                w="100%"
                display="flex"
                justifyContent="space-between"
              >
                <Button
                  color="black"
                  borderRadius={10}
                  onClick={() => setActiveStep(0)}
                >
                  Previous
                </Button>
                <Button
                  bg="blue.700"
                  color="white"
                  ml="auto"
                  onClick={async () => (await canNext()) && setActiveStep(2)}
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
          onClickPrevious={() => setActiveStep(1)}
        />
      </Stepper>
    </div>
  );
};
