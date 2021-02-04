import { capitalise } from "../../utils";

export const getInvalidUuidMessage = (fieldName: string): string =>
  `${capitalise(fieldName)} must be a valid uuid!`;
