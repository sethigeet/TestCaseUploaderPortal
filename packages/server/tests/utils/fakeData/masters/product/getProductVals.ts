export const getProductVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `PROD-${randomId}`,
    name: `Product ${randomId}`,
  };
};
