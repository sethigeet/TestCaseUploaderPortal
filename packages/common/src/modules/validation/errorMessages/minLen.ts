export const MIN_LEN = 3;

export const getMinLenMessage = (
  fieldName: string,
  minLen?: number
): string => {
  const realMinLen = minLen ? minLen : MIN_LEN;

  return `${
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  } must be at least ${realMinLen} characters long!`;
};
