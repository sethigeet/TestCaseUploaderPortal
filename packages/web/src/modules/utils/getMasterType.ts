import { GetProductQuery, GetModuleQuery } from "@portal/controller";

export type Master =
  | GetProductQuery["getProduct"]
  | GetModuleQuery["getModule"];

type MasterNames =
  | "product"
  | "module"
  | "menu"
  | "testingFor"
  | "testingScope"
  | "none";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMasterType = (master: any): MasterNames => {
  if (master.modules) {
    return "product";
  }
  if (master.product) {
    return "module";
  }
  if (master.module) {
    return "menu";
  }
  if (master.menu) {
    return "testingFor";
  }
  if (master.testingFors) {
    return "testingScope";
  }

  return "none";
};
