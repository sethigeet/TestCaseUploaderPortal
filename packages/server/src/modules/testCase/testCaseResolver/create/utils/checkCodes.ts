import { getDoesNotExistMessage } from "@portal/common";

import { FieldError } from "../../../../shared/responseTypes";

import {
  ProductMaster,
  ModuleMaster,
  MenuMaster,
  TestingForMaster,
  TestingScopeMaster,
} from "../../../../masters";

interface Ids {
  productId: string;
  moduleId: string;
  menuId: string;
  testingForId: string;
  testingScopeId: string;
}

export const checkIfIdsExist = async ({
  productId,
  moduleId,
  menuId,
  testingForId,
  testingScopeId,
}: Ids): Promise<FieldError | null> => {
  const products = await ProductMaster.find();
  const productIds = products.map((p) => p.id);
  if (!productIds.includes(productId)) {
    return {
      field: "productId",
      message: getDoesNotExistMessage("productId"),
    };
  }

  const modules = await ModuleMaster.find({
    where: { product: { id: productId } },
  });
  const moduleIds = modules.map((m) => m.id);
  if (!moduleIds.includes(moduleId)) {
    return {
      field: "moduleId",
      message: getDoesNotExistMessage("moduleId"),
    };
  }

  const menus = await MenuMaster.find({
    where: { module: { id: moduleId } },
  });
  const menuIds = menus.map((m) => m.id);
  if (!menuIds.includes(menuId)) {
    return {
      field: "menuId",
      message: getDoesNotExistMessage("menuId"),
    };
  }

  const testingFors = await TestingForMaster.find({
    where: { menu: { id: menuId } },
  });
  const testingForIds = testingFors.map((t) => t.id);
  if (!testingForIds.includes(testingForId)) {
    return {
      field: "testingForId",
      message: getDoesNotExistMessage("testingForId"),
    };
  }

  const testingScopes = await TestingScopeMaster.find({
    where: { testingFor: { id: testingForId } },
  });
  const testingScopeIds = testingScopes.map((t) => t.id);
  if (!testingScopeIds.includes(testingScopeId)) {
    return {
      field: "testingScopeId",
      message: getDoesNotExistMessage("testingScopeId"),
    };
  }

  return null;
};
