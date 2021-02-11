import { FC, useState } from "react";

import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";

import {
  GetMenusQuery,
  GetModulesQuery,
  GetProductsQuery,
} from "@portal/controller";

import { ErrorMessageType } from "../../../../../types";
import {
  ErrorMessage,
  FormContainer,
  Stepper,
  Wrapper,
} from "../../../../../components";

import { ViewAllMastersView } from "../../../../base";

interface ViewAllMenusViewProps {
  loading: boolean;
  errorMessage?: ErrorMessageType;
  data?: GetMenusQuery["getMenus"];
  productId: string;
  setProductId: (val: string) => void;
  products?: GetProductsQuery["getProducts"];
  moduleId: string;
  setModuleId: (val: string) => void;
  modules?: GetModulesQuery["getModules"];
}

export const ViewAllMenusView: FC<ViewAllMenusViewProps> = ({
  loading,
  data,
  products,
  productId,
  setProductId,
  modules,
  moduleId,
  setModuleId,
  errorMessage,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Wrapper loading={loading} errorMessage={errorMessage}>
      <Stepper
        activeStep={activeStep}
        labels={["Select Product", "Select Module", "View Menus"]}
      >
        <FormContainer>
          <FormControl>
            <FormLabel>Product</FormLabel>
            <Select
              placeholder="Select a Product"
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
            <Button
              bg="blue.700"
              color="white"
              disabled={productId === ""}
              onClick={() => productId !== "" && setActiveStep(1)}
            >
              Next
            </Button>
          </Box>
        </FormContainer>
        <FormContainer>
          {modules && modules.length > 0 ? (
            <FormControl>
              <FormLabel>Module</FormLabel>
              <Select
                placeholder="Select a Module"
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
              >
                {modules &&
                  modules.map(({ id, code, name }) => (
                    <option key={id} value={id}>
                      {code} - {name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          ) : (
            <ErrorMessage
              title="An error occurred!"
              message="There are no modules in this product!"
            />
          )}
          <Box
            mt={25}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Button onClick={() => setActiveStep(0)}>Previous</Button>
            <Button
              bg="blue.700"
              color="white"
              disabled={moduleId === ""}
              onClick={() => moduleId !== "" && setActiveStep(2)}
            >
              Next
            </Button>
          </Box>
        </FormContainer>
        <ViewAllMastersView
          masterName="menu"
          data={data}
          loading={loading}
          errorMessage={errorMessage}
          showPreviousButton
          onClickPrevious={() => setActiveStep(1)}
        />
      </Stepper>
    </Wrapper>
  );
};
