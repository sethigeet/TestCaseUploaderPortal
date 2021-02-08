import { GetProductQuery } from "@portal/controller";
import { Master, getMasterType } from "../../../../utils";

export const getChildMasterData = (data: Master): any | null | undefined => {
  switch (getMasterType(data)) {
    case "product":
      return (data as GetProductQuery["getProduct"])?.modules;

    case "none":
      return null;
  }

  return null;
};
