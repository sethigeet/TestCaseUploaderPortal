import { lorem, seed, random } from "faker";

export const getTestCasesVals = (): {
  productId: string;
  moduleId: string;
  menuId: string;
  testingForId: string;
  testingScopeId: string;
  cases: {
    description: string;
    expectedResult: string;
  }[];
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    productId: random.uuid(),
    moduleId: random.uuid(),
    menuId: random.uuid(),
    testingForId: random.uuid(),
    testingScopeId: random.uuid(),
    cases: [
      {
        description: lorem.words(4),
        expectedResult: lorem.words(3),
      },
      {
        description: lorem.words(5),
        expectedResult: lorem.words(2),
      },
      {
        description: lorem.words(6),
        expectedResult: lorem.words(3),
      },
    ],
  };
};
