export const getNewMenuVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `MEN-${randomId}-N`,
    name: `Menu ${randomId} New`,
  };
};
