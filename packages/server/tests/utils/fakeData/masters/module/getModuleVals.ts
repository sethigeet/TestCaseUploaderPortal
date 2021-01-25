export const getModuleVals = (): {
  code: string;
  name: string;
} => {
  const randomId = Math.round(Math.random() * 10000);

  return {
    code: `MOD-${randomId}`,
    name: `Module ${randomId}`,
  };
};
