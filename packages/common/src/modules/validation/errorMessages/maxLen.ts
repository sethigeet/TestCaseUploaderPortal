export const MAX_LEN = 20;

export const getMaxLenMessage = (
  fieldName: string,
  maxLen?: number
): string => {
  const realMaxLen = maxLen ? maxLen : MAX_LEN;

  return `${
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  } cannot be longer than ${realMaxLen} characters!`;
};
