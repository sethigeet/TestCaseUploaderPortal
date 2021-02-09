import { FC, useState } from "react";

import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";

import { GetModulesQuery, GetProductsQuery } from "@portal/controller";

import { ErrorMessageType } from "../../../../../types";
import { FormContainer, Stepper, Wrapper } from "../../../../../components";

import { ViewAllMastersView } from "../../../../base";

interface ViewAllModulesViewProps {
  loading: boolean;
  errorMessage?: ErrorMessageType;
  data?: GetModulesQuery["getModules"];
  productId: string;
  setProductId: (val: string) => void;
  products?: GetProductsQuery["getProducts"];
}

export const ViewAllModulesView: FC<ViewAllModulesViewProps> = ({
  loading,
  data,
  products,
  productId,
  setProductId,
  errorMessage,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Wrapper loading={loading} errorMessage={errorMessage}>
      <Stepper
        activeStep={activeStep}
        labels={["Select Product", "View Modules"]}
      >
        <FormContainer>
          <FormControl>
            <FormLabel>Product</FormLabel>
            <Select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              {products &&
                products.map(({ id, code, name }) => (
                  <option key={id} value={id}>
                    {code} - {name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <Box mt={25}>
            <Button onClick={() => setActiveStep(1)}>Next</Button>
          </Box>
        </FormContainer>
        <ViewAllMastersView
          masterName="module"
          data={data}
          loading={loading}
          errorMessage={errorMessage}
          showPreviousButton
          onClickPrevious={() => setActiveStep(0)}
        />
      </Stepper>
    </Wrapper>
  );
};
