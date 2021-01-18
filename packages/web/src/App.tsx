import { FC } from "react";

import { ThemeProvider } from "./modules/theme";
import { Routes } from "./modules/routes";

const App: FC = () => {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
