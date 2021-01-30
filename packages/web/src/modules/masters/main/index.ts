import { RouteType } from "../../types";

import { MainMastersView } from "./MainMastersView";

export const MainMastersViewRoute: RouteType = {
  path: "/masters",
  component: MainMastersView,
  private: true,
};
