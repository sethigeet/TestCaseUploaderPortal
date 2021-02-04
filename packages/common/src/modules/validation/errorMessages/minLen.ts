import { capitalise } from "../../utils";

export const MIN_LEN = 3;

export const getMinLenMessage = (
  fieldName: string,
  minLen?: number
): string => {
  const realMinLen = minLen || MIN_LEN;

  return `${capitalise(
    fieldName
  )} must be at least ${realMinLen} characters long!`;
};
