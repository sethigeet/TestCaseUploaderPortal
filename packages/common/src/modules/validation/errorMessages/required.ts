import { capitalise } from "../../utils";

export const getRequiredMessage = (fieldName: string): string =>
  `${capitalise(fieldName)} is required!`;
