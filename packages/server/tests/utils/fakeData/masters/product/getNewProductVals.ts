export const getNewProductVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `PROD-${randomId}-N`,
    name: `Product ${randomId} New`,
  };
};
