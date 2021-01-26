export const getNewTestingScopeVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `TSCO-${randomId}-N`,
    name: `Testing Scope ${randomId} New`,
  };
};
