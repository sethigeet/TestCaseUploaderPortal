export const getMenuVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `MEN-${randomId}`,
    name: `Menu ${randomId}`,
  };
};
