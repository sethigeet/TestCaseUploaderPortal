import { productResolvers } from "./product";
import { moduleResolvers } from "./module";

export const mastersResolvers: any = [...productResolvers, ...moduleResolvers];
