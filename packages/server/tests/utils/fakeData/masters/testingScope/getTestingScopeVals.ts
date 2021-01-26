export const getTestingScopeVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `TSCO-${randomId}`,
    name: `Testing Scope ${randomId}`,
  };
};
