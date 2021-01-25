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
