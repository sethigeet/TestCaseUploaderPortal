export const getTestingForVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `TFOR-${randomId}`,
    name: `Testing For ${randomId}`,
  };
};
