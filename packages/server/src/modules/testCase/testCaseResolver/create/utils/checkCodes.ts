import { getDoesNotExistMessage } from "@portal/common";

import { FieldError } from "../../../../shared/responseTypes";

import {
  ProductMaster,
  ModuleMaster,
  MenuMaster,
  TestingForMaster,
  TestingScopeMaster,
} from "../../../../masters";

interface Codes {
  productCode: string;
  moduleCode: string;
  menuCode: string;
  testingFor: string;
  testingScope: string;
}

export const checkIfCodesExist = async ({
  productCode,
  moduleCode,
  menuCode,
  testingFor,
  testingScope,
}: Codes): Promise<FieldError | null> => {
  const products = await ProductMaster.find();
  const productCodes = products.map((p) => p.code);
  if (!productCodes.includes(productCode)) {
    return {
      field: "productCode",
      message: getDoesNotExistMessage("productCode"),
    };
  }

  const modules = await ModuleMaster.find({
    where: { product: { code: productCode } },
  });
  const moduleCodes = modules.map((m) => m.code);
  if (!moduleCodes.includes(moduleCode)) {
    return {
      field: "moduleCode",
      message: getDoesNotExistMessage("moduleCode"),
    };
  }

  const menus = await MenuMaster.find({
    where: { module: { code: moduleCode } },
  });
  const menuCodes = menus.map((m) => m.code);
  if (!menuCodes.includes(menuCode)) {
    return {
      field: "menuCode",
      message: getDoesNotExistMessage("menuCode"),
    };
  }

  const testingFors = await TestingForMaster.find({
    where: { menu: { code: menuCode } },
  });
  const testingForCodes = testingFors.map((t) => t.code);
  if (!testingForCodes.includes(testingFor)) {
    return {
      field: "testingFor",
      message: getDoesNotExistMessage("testingFor"),
    };
  }

  const testingScopes = await TestingScopeMaster.find({
    where: { testingFor: { code: testingFor } },
  });
  const testingScopeCodes = testingScopes.map((t) => t.code);
  if (!testingScopeCodes.includes(testingScope)) {
    return {
      field: "testingScope",
      message: getDoesNotExistMessage("testingScope"),
    };
  }

  return null;
};
