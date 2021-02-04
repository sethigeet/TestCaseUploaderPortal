import { capitalise } from "../../utils";

export const MAX_LEN = 20;

export const getMaxLenMessage = (
  fieldName: string,
  maxLen?: number
): string => {
  const realMaxLen = maxLen || MAX_LEN;

  return `${capitalise(
    fieldName
  )} cannot be longer than ${realMaxLen} characters!`;
};
