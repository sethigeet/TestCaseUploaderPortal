export const getNewModuleVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `MOD-${randomId}-N`,
    name: `Module ${randomId} New`,
  };
};
