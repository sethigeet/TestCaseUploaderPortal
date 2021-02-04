import { capitalise } from "../../utils";

export const getMustNotContainMessage = (
  fieldName: string,
  symbol: string
): string => `${capitalise(fieldName)} must not contain "${symbol}" symbol`;
