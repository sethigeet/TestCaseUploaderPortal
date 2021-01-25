import { lorem, seed } from "faker";

export const getTestCasesVals = (): {
  productCode: string;
  moduleCode: string;
  menuCode: string;
  testingFor: string;
  testingScope: string;
  cases: {
    description: string;
    expectedResult: string;
  }[];
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    productCode: "PROD-1",
    moduleCode: "MOD-1",
    menuCode: "MEN-3",
    testingFor: "TFOR-1",
    testingScope: "TSCO-1",
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
