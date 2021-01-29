import { lorem, seed, random } from "faker";

export const getTestCaseVals = (): {
  productId: string;
  moduleId: string;
  menuId: string;
  testingForId: string;
  testingScopeId: string;
  description: string;
  expectedResult: string;
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    productId: random.uuid(),
    moduleId: random.uuid(),
    menuId: random.uuid(),
    testingForId: random.uuid(),
    testingScopeId: random.uuid(),
    description: lorem.words(5),
    expectedResult: lorem.words(2),
  };
};
