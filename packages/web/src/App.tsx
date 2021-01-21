import { FC } from "react";

import { ApiProvider } from "@portal/controller";

import { ThemeProvider } from "./modules/theme";
import { Routes } from "./modules/routes";

const App: FC = () => {
  return (
    <ApiProvider>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </ApiProvider>
  );
};

export default App;
