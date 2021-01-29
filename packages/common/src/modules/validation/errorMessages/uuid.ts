export const getInvalidUuidMessage = (fieldName: string): string =>
  `${
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  } must be a valid uuid!`;
