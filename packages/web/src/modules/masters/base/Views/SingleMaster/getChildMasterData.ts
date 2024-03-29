import {
  GetMenuQuery,
  GetModuleQuery,
  GetProductQuery,
} from "@portal/controller";

import { Master, getMasterType } from "../../../../utils";

export const getChildMasterData = (data: Master): any | null | undefined => {
  switch (getMasterType(data)) {
    case "product":
      return (data as GetProductQuery["getProduct"])?.modules;

    case "module":
      return (data as GetModuleQuery["getModule"])?.menus;

    case "menu":
      return (data as GetMenuQuery["getMenu"])?.testingFors;

    case "none":
      return null;
  }

  return null;
};
