import { lorem, seed } from "faker";

export const getNewUntestedTestCaseVals = (): {
  description: string;
  expectedResult: string;
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    description: lorem.words(5),
    expectedResult: lorem.words(2),
  };
};

export const getNewTestedTestCaseVals = (): {
  actualResult: string;
  userRemarks: string;
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    actualResult: lorem.words(3),
    userRemarks: lorem.sentences(2),
  };
};
