export const getNewTestingForVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `TFOR-${randomId}-N`,
    name: `Testing For ${randomId} New`,
  };
};
