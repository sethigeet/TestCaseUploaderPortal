import { lorem, seed, random } from "faker";

export const getCreateTestCaseVals = (): {
  productId: string;
  moduleId: string;
  menuId: string;
  testingForId: string;
  testingScopeId: string;
  case: {
    description: string;
    expectedResult: string;
  };
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    productId: random.uuid(),
    moduleId: random.uuid(),
    menuId: random.uuid(),
    testingForId: random.uuid(),
    testingScopeId: random.uuid(),
    case: {
      description: lorem.words(5),
      expectedResult: lorem.words(2),
    },
  };
};
