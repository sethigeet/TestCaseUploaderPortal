import { productResolvers } from "./product";
import { moduleResolvers } from "./module";
import { menuResolvers } from "./menu";
import { testingForResolvers } from "./testingFor";
import { testingScopeResolvers } from "./testingScope";

export const mastersResolvers: any = [
  ...productResolvers,
  ...moduleResolvers,
  ...menuResolvers,
  ...testingForResolvers,
  ...testingScopeResolvers,
];

export { ProductMaster, ProductMasterHistory } from "./product";
export { ModuleMaster, ModuleMasterHistory } from "./module";
export { MenuMaster, MenuMasterHistory } from "./menu";
export { TestingForMaster, TestingForMasterHistory } from "./testingFor";
export { TestingScopeMaster, TestingScopeMasterHistory } from "./testingScope";
