import { lorem } from "faker";

export const getTestTestCaseVals = (
  id: string,
  passed: boolean
): {
  id: string;
  passed: boolean;
  userRemarks: string;
  actualResult: string;
} => ({
  id,
  passed,
  userRemarks: lorem.sentence(7),
  actualResult: lorem.words(3),
});
